"use client";

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

interface QuestionField {
  id: string;
  type: string;
  label: string;
  required: boolean;
}

const FIELD_TYPES = [
  { id: 'text', label: 'Short Text' },
  { id: 'email', label: 'Email Address' },
  { id: 'date', label: 'Date of Birth' },
  { id: 'phone', label: 'Phone Number' },
  { id: 'select', label: 'Dropdown Select' },
];

export default function QuestionnaireBuilder() {
  const [fields, setFields] = useState<QuestionField[]>([
    { id: 'field-1', type: 'text', label: 'Full Legal Name', required: true },
    { id: 'field-2', type: 'date', label: 'Date of Birth', required: true }
  ]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFields(items);
  };

  const addField = (type: string) => {
    const newField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} question`,
      required: false
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<QuestionField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const deleteField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Toolbox */}
      <div className="lg:col-span-1 bg-white dark:bg-zinc-950 border border-border rounded-xl p-4 shadow-sm h-fit">
        <h3 className="font-semibold mb-4 border-b border-border pb-2">Add Fields</h3>
        <div className="space-y-2">
          {FIELD_TYPES.map(ft => (
            <button 
              key={ft.id}
              onClick={() => addField(ft.id)}
              className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-sm"
            >
              <span>{ft.label}</span>
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Editor Canvas */}
      <div className="lg:col-span-3 bg-gray-50 dark:bg-zinc-900 border border-border rounded-xl p-6 shadow-inner min-h-[600px]">
        <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-sm border border-border p-6 max-w-2xl mx-auto">
            <div className="mb-6 border-b border-border pb-4">
                <input 
                    type="text" 
                    defaultValue="KYC Form (Tier 2)" 
                    className="text-2xl font-bold border-none outline-none w-full bg-transparent placeholder-gray-300 dark:placeholder-zinc-700"
                    placeholder="Form Title"
                />
                <input 
                    type="text" 
                    defaultValue="Please provide additional information for compliance." 
                    className="text-sm text-gray-500 border-none outline-none w-full mt-2 bg-transparent"
                    placeholder="Form Description"
                />
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questionnaire-fields">
                {(provided) => (
                <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                    className="space-y-3"
                >
                    {fields.map((field, index) => (
                    <Draggable key={field.id} draggableId={field.id} index={index}>
                        {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="group flex gap-3 p-4 bg-white dark:bg-zinc-900 border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow relative"
                        >
                            <div 
                                {...provided.dragHandleProps}
                                className="flex items-center text-gray-400 hover:text-black dark:hover:text-white cursor-grab active:cursor-grabbing"
                            >
                                <GripVertical className="w-5 h-5" />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between gap-4">
                                    <input 
                                        type="text"
                                        value={field.label}
                                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                                        className="font-medium bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/20 rounded px-1 py-0.5 w-full"
                                    />
                                    <div className="flex items-center gap-2">
                                        <label className="text-xs flex items-center gap-1 text-gray-500">
                                            <input 
                                                type="checkbox" 
                                                checked={field.required}
                                                onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                                className="rounded border-gray-300 accent-primary"
                                            />
                                            Required
                                        </label>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                                    Type: {field.type}
                                </div>
                            </div>

                            <button 
                                onClick={() => deleteField(field.id)}
                                className="opacity-0 group-hover:opacity-100 absolute -right-3 -top-3 p-1.5 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full shadow-sm hover:scale-110 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
            </DragDropContext>

            {fields.length === 0 && (
                <div className="text-center py-12 text-gray-400 border-2 border-dashed border-border rounded-xl">
                    Drag or click fields from the left to build your form.
                </div>
            )}
        </div>
        
        <div className="mt-8 flex justify-end max-w-2xl mx-auto">
            <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-md hover:opacity-90 font-medium">
                Save Questionnaire
            </button>
        </div>
      </div>
    </div>
  );
}
