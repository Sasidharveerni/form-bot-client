import React, { useEffect, useState } from 'react';
import './WorkSpace.css';
import { useNavigate } from 'react-router';
import axios from 'axios';
import showToasts from '../../pages/Toast';
import { deleteIcon, createIcon, createFlowIcon } from '../flow/Svg';

function WorkSpace({ userData }) {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(''); // 'create' or 'delete'
    const [newFolderName, setNewFolderName] = useState('');
    const [folders, setFolders] = useState([]);
    const [folderToDelete, setFolderToDelete] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);

    useEffect(() => {
        if (userData) {
            getFolders();
        }
    }, [userData]);

    console.log(folders);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const openCreateModal = () => {
        setModalMode('create');
        setIsCreateModalOpen(true);
    };

    const openDeleteModal = (folder) => {
        setFolderToDelete(folder);
        setModalMode('delete');
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        setNewFolderName('');
        setFolderToDelete(null);
    };

    const deleteFolder = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/delete-folder/${folderToDelete._id}`);
            if (response.data.status === 'Success') {
                setFolders(folders.filter(folder => folder.id !== folderToDelete.id));
                showToasts(response.data.message, 'success');
            }
            closeCreateModal();
        } catch (error) {
            showToasts(error, 'error');
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('formBotEmail');
        localStorage.removeItem('formBotToken');
        showToasts('Logged out successfully', 'success');
        navigate('/');
    };

    const getFolders = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/get-folders/${userData._id}`);
            if (response.data.status === 'Success') {
                setFolders(response.data.data);
            }
        } catch (error) {
            showToasts(error, 'error');
            console.log(error);
        }
    };

    const navigateForm = (ele) => {
        localStorage.setItem('formId', ele._id);
        navigate('/start-flow');
        console.log(ele);
    }

    const createFolder = async () => {
        try {
            const response = await axios.post('http://localhost:5000/create-folder', {
                name: newFolderName.trim(),
                creatorId: userData._id,
            });
            if (response.data.status === 'Success') {
                setFolders([...folders, { id: response.data.data._id, name: newFolderName.trim(), forms: [] }]);
            }
            closeCreateModal();
        } catch (error) {
            console.log(error);
            closeCreateModal();
        }
    };

    const selectFolder = (folder) => {
        console.log(folder)
        localStorage.setItem('folderId', folder._id)
        setSelectedFolder(folder);
    };

    const reDirectToFlow = () => {
        localStorage.removeItem('formId');
        navigate('/start-flow');
    }

    const deleteFlow = async (getFormId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/delete-flow/${getFormId}`);
            if (response.data.status === 'Success') {
                showToasts('Flow deleted successfully', 'success');
                //here update forms in setFolders

                setFolders(prevFolders => {
                    return prevFolders.map(folder => {
                        if (folder._id === selectedFolder._id) {
                            return {
                                ...folder,
                                forms: folder.forms.filter(form => form._id !== getFormId)
                            };
                        }
                        return folder;
                    });
                });
            } else {
                showToasts(response.data.message, 'error');
                console.log('Error in deleting flow');
            }
        } catch (error) {
            console.log('Error in deleting flow', error);
        }
    };

    if (!userData) {
        return (
            <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'white' }}>Please log in first to access your workspace.</p>
                <button onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        );
    }

    return (
        <>
            <div className='workspace-container'>
                <div className='workspace-section'>
                    <div className='workspace-header' onClick={toggleDropdown}>
                        <p>{userData.username}'s workspace</p>
                        <svg
                            className={`dropdown-arrow ${isDropdownOpen ? 'rotated' : ''}`}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                                fill="#ffffff"
                            />
                        </svg>
                    </div>
                    {isDropdownOpen && (
                        <div className='dropdown-menu'>
                            <div className='dropdown-item' onClick={() => navigate('/settings')}>Settings</div>
                            <div className='dropdown-item logout' onClick={() => logout()}>Log Out</div>
                        </div>
                    )}
                </div>
            </div>

            <hr />

            <div className='folder-section'>
                <div className='create-folder' onClick={openCreateModal}>
                    {createIcon}
                    <div>Create a folder</div>
                </div>

                <div className='folder-grid'>
                    {folders.map(folder => (
                        <div key={folder.id} className='folder-item' onClick={() => selectFolder(folder)}>
                            <div>{folder.name}</div>
                            <svg onClick={(e) => { e.stopPropagation(); openDeleteModal(folder); }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#F55050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 11V17" stroke="#F55050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#F55050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#F55050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#F55050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </div>
                    ))}
                </div>
            </div>

            {isCreateModalOpen && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        {modalMode === 'create' && <h2>Create New Folder</h2>}
                        {modalMode === 'delete' && <h2>Are you sure you want to delete this folder?</h2>}
                        {modalMode === 'create' && (
                            <input
                                type="text"
                                placeholder="Enter folder name"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                            />
                        )}

                        <div className='button-section'>
                            <div>
                                <button className='done-btn' onClick={modalMode === 'create' ? createFolder : deleteFolder}>
                                    {modalMode === 'create' ? 'Done' : 'Confirm'}
                                </button>
                            </div>
                            <div>
                                <p>|</p>
                            </div>
                            <div>
                                <button className='cancel-btn' onClick={closeCreateModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='forms-grid'>
                <div className='create-typebot' onClick={() => reDirectToFlow()}>
                    <div>
                        {createFlowIcon}
                    </div>
                    <div>
                        Create a typebot
                    </div>
                </div>

                {selectedFolder && selectedFolder.forms && selectedFolder.forms.map((ele, ind) => (
                    <div key={ind} className='create-typebot' onClick={() => navigateForm(ele)} style={{ backgroundColor: 'rgba(255, 255, 255, 0.50)' }}>
                        <div className='position-delete' onClick={(e) => {
                            e.stopPropagation();
                            deleteFlow(ele._id);
                        }}>
                            {deleteIcon}
                        </div>
                        <div>
                            {ele.name}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default WorkSpace;
