import { db } from '@/utils';
import { storage } from '@/utils/firebaseConfig';
import { project } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { ref, uploadBytes } from 'firebase/storage';
import { Link2, SquareStack, Trash2, GripVertical } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Projectlistedit = ({ projectList, refreshdata }) => {
  const [selectedOption, setSelectedOption] = useState();
  const [projects, setProjects] = useState([...projectList]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const timeoutIdRef = useRef();

  // Update local projects state if projectList prop changes
  useEffect(() => {
    setProjects([...projectList]);
  }, [projectList]);

  const onInputChange = (value, fieldname, projectid) => {
    clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = setTimeout(async () => {
      try {
        const result = await db
          .update(project)
          .set({ [fieldname]: value })
          .where(eq(project.id, projectid));

        if (result) {
          toast.success('Saved', { position: 'bottom-right' });
        } else {
          toast.error('Try again later', { position: 'bottom-right' });
        }
      } catch {
        toast.error('Try again later', { position: 'bottom-right' });
      }
    }, 1000);
  };

  const handleFileInput = (event, projectid) => {
    const file = event.target.files[0];
    if (!file) return;

    const filename = Date.now().toString() + '.' + file.type.split('/')[1];
    const storageRef = ref(storage, filename);

    uploadBytes(storageRef, file).then(async (snapshot) => {
      console.log('Uploaded a blob or file!');
      const result = await db
        .update(project)
        .set({ logo: filename + '?alt=media' })
        .where(eq(project.id, projectid));

      if (result) {
        refreshdata();
        toast.success('Success', { position: 'bottom-right' });
      } else {
        toast.error('Upload failed', { position: 'bottom-right' });
      }
    });
  };

  const ondelete = (projectid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await db.delete(project).where(eq(project.id, projectid));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        refreshdata();
      }
    });
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null);
      return;
    }

    const reordered = [...projects];
    const [movedItem] = reordered.splice(draggedIndex, 1);
    reordered.splice(dropIndex, 0, movedItem);

    setProjects(reordered);
    setDragOverIndex(null);
    setDraggedIndex(null);

    toast.success('Project reordered (not saved)', { position: 'bottom-right' });
  };

  return (
    <div className='mt-10'>
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`my-5 transition-all duration-200 ${
            dragOverIndex === index ? 'transform scale-105 shadow-lg' : ''
          } ${draggedIndex === index ? 'opacity-50' : ''}`}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
        >
          <div className='flex items-center gap-3 p-3 bg-gray-800 rounded-lg relative cursor-move hover:bg-gray-700 transition-colors'>
            <div className='absolute left-1 top-1/2 transform -translate-y-1/2'>
              <GripVertical className='w-4 h-4 text-gray-400' />
            </div>

            <label htmlFor={`project-file-input${index}`} className='cursor-pointer ml-6'>
              <img
                src={project.logo}
                alt="project logo"
                className='w-[50px] h-[50px] rounded-full border-2 border-primary'
              />
            </label>
            <input
              type="file"
              id={`project-file-input${index}`}
              style={{ display: 'none' }}
              onChange={(e) => handleFileInput(e, project.id)}
            />
            <input
              type="text"
              placeholder="Project name"
              className="input w-full my-2"
              onChange={(e) => onInputChange(e.target.value, 'name', project.id)}
              defaultValue={project.name}
              onMouseDown={(e) => e.stopPropagation()}
            />
          </div>

          <input
            type="text"
            placeholder="Description"
            className="input w-full"
            onChange={(e) => onInputChange(e.target.value, 'desc', project.id)}
            defaultValue={project.desc}
            onMouseDown={(e) => e.stopPropagation()}
          />

          <div>
            <div className="flex gap-3 mt-3 items-center justify-between">
              <div className="flex gap-3 mt-3">
                <Link2
                  className={`h-12 w-12 p-3 rounded-md hover:bg-gray-400 cursor-pointer ${
                    selectedOption === 'link' + index ? 'bg-gray-600' : ''
                  }`}
                  onClick={() => setSelectedOption('link' + index)}
                />
                <SquareStack
                  className={`h-12 w-12 p-3 rounded-md hover:bg-gray-400 cursor-pointer ${
                    selectedOption === 'squarestack' + index ? 'bg-gray-600' : ''
                  }`}
                  onClick={() => setSelectedOption('squarestack' + index)}
                />
              </div>

              <div className='flex gap-3 items-center'>
                <button
                  className='btn btn-error btn-sm'
                  onClick={(e) => {
                    e.stopPropagation();
                    ondelete(project.id);
                  }}
                >
                  <Trash2 />
                </button>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  defaultChecked={project.active}
                  onChange={(e) =>
                    onInputChange(e.target.checked, 'active', project.id)
                  }
                  onMouseDown={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {selectedOption === 'link' + index ? (
              <div className="mt-5">
                <label className="input w-full">
                  <Link2 />
                  <input
                    type="text"
                    className="grow"
                    placeholder="URL"
                    onChange={(e) => onInputChange(e.target.value, 'url', project.id)}
                    defaultValue={project?.url}
                    onMouseDown={(e) => e.stopPropagation()}
                  />
                </label>
              </div>
            ) : selectedOption === 'squarestack' + index ? (
              <div className="mt-5">
                <label className="input w-full">
                  <SquareStack />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Category"
                    onChange={(e) =>
                      onInputChange(e.target.value, 'category', project.id)
                    }
                    defaultValue={project?.category}
                    onMouseDown={(e) => e.stopPropagation()}
                  />
                </label>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projectlistedit;
