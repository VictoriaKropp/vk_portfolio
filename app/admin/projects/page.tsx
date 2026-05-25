'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Image from 'next/image';

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Project = {
    id: string;
    title: string;
    tag: string;
    description: string;
    link: string;
    image_url: string;
    order: number;
    visible: boolean;
};

type Module = {
    id: string;
    project_id: string;
    title: string;
    description: string;
    image_url: string;
    order: number;
};

async function uploadImage(file: File, folder: string): Promise<string | null> {
    const fileName = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('images').upload(fileName, file, { upsert: true });
    if (error) { console.error('Upload error:', error); return null; }
    const { data } = supabase.storage.from('images').getPublicUrl(fileName);
    return data.publicUrl;
}

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editing, setEditing] = useState<Project | null>(null);
    const [isNew, setIsNew] = useState(false);
    const [expanded, setExpanded] = useState<string | null>(null);
    const [modules, setModules] = useState<Record<string, Module[]>>({});
    const [editingModule, setEditingModule] = useState<Module | null>(null);
    const [isNewModule, setIsNewModule] = useState(false);

    const emptyProject: Project = { id: '', title: '', tag: '', description: '', link: '', image_url: '', order: 0, visible: true };
    const emptyModule = (project_id: string): Module => ({ id: '', project_id, title: '', description: '', image_url: '', order: 0 });

    useEffect(() => { fetchProjects(); }, []);

    async function fetchProjects() {
        const { data } = await supabase.from('projects').select('*').order('order');
        if (data) setProjects(data);
    }

    async function fetchModules(project_id: string) {
        const { data } = await supabase.from('project_modules').select('*').eq('project_id', project_id).order('order');
        if (data) setModules(prev => ({ ...prev, [project_id]: data }));
    }

    function toggleExpand(id: string) {
        if (expanded === id) { setExpanded(null); } 
        else { setExpanded(id); fetchModules(id); }
    }

    async function handleSaveProject() {
        if (isNew) {
            await supabase.from('projects').insert({ ...editing, id: undefined });
        } else {
            await supabase.from('projects').update(editing!).eq('id', editing!.id);
        }
        setEditing(null);
        setIsNew(false);
        fetchProjects();
    }

    async function handleDeleteProject(id: string) {
        await supabase.from('projects').delete().eq('id', id);
        fetchProjects();
    }

    async function handleSaveModule() {
        if (isNewModule) {
            await supabase.from('project_modules').insert({ ...editingModule, id: undefined });
        } else {
            await supabase.from('project_modules').update(editingModule!).eq('id', editingModule!.id);
        }
        fetchModules(editingModule!.project_id);
        setEditingModule(null);
        setIsNewModule(false);
    }

    async function handleDeleteModule(mod: Module) {
        await supabase.from('project_modules').delete().eq('id', mod.id);
        fetchModules(mod.project_id);
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = await uploadImage(file, 'projects');
        if (url) setEditing(prev => ({ ...prev!, image_url: url }));
    }

    async function handleModuleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = await uploadImage(file, 'modules');
        if (url) setEditingModule(prev => ({ ...prev!, image_url: url }));
    }

    if (editingModule) return (
        <div className="admin-form">
            <h2>{isNewModule ? 'Nuevo módulo' : 'Editar módulo'}</h2>
            <input placeholder="Título" value={editingModule.title} onChange={e => setEditingModule({ ...editingModule, title: e.target.value })} />
            <textarea placeholder="Descripción" value={editingModule.description} onChange={e => setEditingModule({ ...editingModule, description: e.target.value })} />
            <input type="file" accept="image/*" onChange={handleModuleImageUpload} />
            {editingModule.image_url && (
                <Image src={editingModule.image_url} alt="preview" width={200} height={200} className="admin-preview-img" />
            )}
            <input placeholder="Orden" type="number" value={editingModule.order} onChange={e => setEditingModule({ ...editingModule, order: Number(e.target.value) })} />
            <div className="admin-form-actions">
                <button onClick={handleSaveModule}>Guardar</button>
                <button onClick={() => { setEditingModule(null); setIsNewModule(false); }}>Cancelar</button>
            </div>
        </div>
    );

    if (editing) return (
        <div className="admin-form">
            <h2>{isNew ? 'Nuevo proyecto' : 'Editar proyecto'}</h2>
            <input placeholder="Título" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
            <input placeholder="Tag" value={editing.tag} onChange={e => setEditing({ ...editing, tag: e.target.value })} />
            <textarea placeholder="Descripción" value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} />
            <input placeholder="Link" value={editing.link} onChange={e => setEditing({ ...editing, link: e.target.value })} />
            <input placeholder="Orden" type="number" value={editing.order} onChange={e => setEditing({ ...editing, order: Number(e.target.value) })} />
            <label>
                <input type="checkbox" checked={editing.visible} onChange={e => setEditing({ ...editing, visible: e.target.checked })} />
                Visible
            </label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {editing.image_url && (
                <Image src={editing.image_url} alt="preview" width={200} height={200} className="admin-preview-img" />
            )}
            <div className="admin-form-actions">
                <button onClick={handleSaveProject}>Guardar</button>
                <button onClick={() => { setEditing(null); setIsNew(false); }}>Cancelar</button>
            </div>
        </div>
    );

    return (
        <div className="admin-section">
            <h2>Proyectos</h2>
            <button onClick={() => { setEditing(emptyProject); setIsNew(true); }}>+ Nuevo proyecto</button>
            <div className="admin-list">
                {projects.map(p => (
                    <div key={p.id} className="admin-project-item">
                        <div className="admin-list-item">
                            <span>{p.title}</span>
                            <div>
                                <button onClick={() => toggleExpand(p.id)}>{expanded === p.id ? '▲' : '▼'}</button>
                                <button onClick={() => setEditing(p)}>Editar</button>
                                <button onClick={() => handleDeleteProject(p.id)}>Eliminar</button>
                            </div>
                        </div>
                        {expanded === p.id && (
                            <div className="admin-modules">
                                {(modules[p.id] || []).map(mod => (
                                    <div key={mod.id} className="admin-module-item">
                                        <span>{mod.title}</span>
                                        <div>
                                            <button onClick={() => { setEditingModule(mod); setIsNewModule(false); }}>Editar</button>
                                            <button onClick={() => handleDeleteModule(mod)}>Eliminar</button>
                                        </div>
                                    </div>
                                ))}
                                <button className="admin-module-add" onClick={() => { setEditingModule(emptyModule(p.id)); setIsNewModule(true); }}>+ Módulo</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}