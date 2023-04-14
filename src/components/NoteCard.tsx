import { useState } from "react";
import { RouterOutputs } from "~/utils/api";

type Note = RouterOutputs["note"]["get"][number];

type Props = {
  note: Note;
  onDelete: ({ noteId }: { noteId: string }) => void;
  loading: boolean;
};

function NoteCard({ note, onDelete, loading }: Props) {
  const title = note.topic.title;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onDelete({
      noteId: note.id,
    });
  };

  return (
    <div className="card mb-5 w-full border p-5">
      <div className="rounded-box collapse bg-base-100">
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-xl font-medium">{title}</div>
        <div className="collapse-content">
          <p>{note.content}</p>
        </div>
      </div>
      <div className="card-actions justify-end">
        <button onClick={handleDelete} className="btn-error btn">
          {loading ? "Loading..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
