import { useState } from "react";
import { RouterOutputs } from "~/utils/api";

type Note = RouterOutputs["note"]["get"][number];

type Props = {
  note: Note;
  onDelete: ({ noteId }: { noteId: string }) => void;
  loading: boolean;
};

function NoteCard({ note, onDelete, loading }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const title = note.topic.title;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onDelete({
      noteId: note.id,
    });
  };

  return (
    <div className="card mb-5 w-full border">
      <div
        className={`${
          collapsed ? "collapse-open" : "collapse-close"
        } card-body`}
      >
        <div
          onClick={() => setCollapsed((prev) => !prev)}
          className="collapse-title text-neutral"
        >
          {title}
        </div>
        <div className="collapse-content bg-slate-100 text-slate-900  ">
          <p>{note.content}</p>
        </div>
        <div className="card-actions justify-end">
          <button onClick={handleDelete} className="btn-error btn">
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
