import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTaskById, updateTask, selectTaskById } from '../features/tasks/tasksSlice'
import { fetchMembers, selectAllMembers } from '../features/members/membersSlice'

import NameDescriptionCard from '../components/Tasks/NameDescription'
import DateStatusCard      from '../components/Tasks/DateStatus'
import AssigneesCard       from '../components/Tasks/Assignees'

const statusOptions = [
  'Not Started',
  'In Review',
  'In Progress',
  'Completed'
]

export default function EditTask() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const task = useSelector(state => selectTaskById(state, id))
  const allMembers = useSelector(selectAllMembers)

  const [editingMain, setEditingMain] = useState(false)
  const [editingMeta, setEditingMeta] = useState(false)

  const [mainForm, setMainForm] = useState({ name: '', description: '' })
  const [metaForm, setMetaForm] = useState({ dateCreated: '', status: '' })
  const [assignees, setAssignees] = useState([])

  const [addOpen, setAddOpen] = useState(false)
  const [selectedForAdd, setSelectedForAdd] = useState([])
  const [selectedMember,  setSelectedMember]  = useState(null)

  const currentUserId = useSelector(state => state.auth.currentUser?.id)

  useEffect(() => {
    dispatch(fetchTaskById(id))
    dispatch(fetchMembers())
  }, [dispatch, id])

  useEffect(() => {
    if (task && allMembers.length) {
      setMainForm({ name: task.name, description: task.description })
      setMetaForm({ dateCreated: task.dateCreated, status: task.status })
      const current = allMembers.filter(m => task.employeeIds.includes(m.id))
      setAssignees(current)
      setSelectedMember(current[0] || null)
    }
  }, [task, allMembers])

  const handleMainEdit = () => setEditingMain(true)
  const handleMainSave = async () => {
    await dispatch(updateTask({ id, changes: { name: mainForm.name, description: mainForm.description } })).unwrap()
    setEditingMain(false)
  }

  const handleMetaEdit = () => setEditingMeta(true)
  const handleMetaSave = async () => {
    await dispatch(updateTask({ id, changes: { dateCreated: metaForm.dateCreated, status: metaForm.status } })).unwrap()
    setEditingMeta(false)
  }

  const handleAssigneeRemove = async memberId => {
    const updated = assignees.filter(m => m.id !== memberId)
    await dispatch(updateTask({ id, changes: { employeeIds: updated.map(m => m.id) } })).unwrap()
    setAssignees(updated)
    if (selectedMember?.id === memberId) setSelectedMember(updated[0] || null)
  }

  const handleAssigneeAdd = async () => {
    const updated = [...assignees, ...selectedForAdd]
    await dispatch(updateTask({ id, changes: { employeeIds: updated.map(m => m.id) } })).unwrap()
    setAssignees(updated)
    setAddOpen(false)
    setSelectedForAdd([])
    setSelectedMember(updated[0] || null)
  }

  if (!task) {
    return <Typography sx={{ mt:4, textAlign:'center' }} variant="h6">Loading task…</Typography>
  }
  const availableMembers = allMembers.filter(m => !assignees.find(a => a.id === m.id))

  return (
    <Box sx={{ p:4,  position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #90caf9 0%, #e3f2fd 100%)', minHeight:'100vh' }}>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ mt: 6, ml: 1, fontWeight: 'normal', fontSize: '1rem' }}
      >
        Details for Case ID: {task.id}
      </Typography>
      <Box sx={{ display:'flex', gap:2 }}>
        <Box sx={{ flex:1, display:'flex', flexDirection:'column', gap:2 }}>
          <NameDescriptionCard
            editing={editingMain}
            form={mainForm}
            onEdit={handleMainEdit}
            onSave={handleMainSave}
            onChange={e => setMainForm(f => ({ ...f, [e.target.name]: e.target.value }))}
          />

          <DateStatusCard
            editing={editingMeta}
            form={metaForm}
            statusOptions={statusOptions}
            onEdit={handleMetaEdit}
            onSave={handleMetaSave}
            onChange={e => setMetaForm(f => ({ ...f, [e.target.name]: e.target.value }))}
          />
        </Box>

        <AssigneesCard
          assignees={assignees}
          selectedMember={selectedMember}
          onSelectMember={setSelectedMember}
          onRemoveMember={handleAssigneeRemove}
          onAddOpen={() => setAddOpen(true)}
          onAddClose={() => setAddOpen(false)}
          addOpen={addOpen}
          available={availableMembers}
          selectedForAdd={selectedForAdd}
          onAddChange={(_, val) => setSelectedForAdd(val)}
          onAdd={handleAssigneeAdd}
          currentUserId={currentUserId}
        />
      </Box>
    </Box>
  )
}
