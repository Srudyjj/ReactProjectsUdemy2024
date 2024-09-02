import { useState } from "react";
import { Gift } from "../App";
import { v4 as uuid } from 'uuid';

interface ModalProps {
  onClose: () => void
  onSave: (gift: Gift) => void
}

export default function Modal({ onClose, onSave }: ModalProps) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");
  const saveGift = () => {
    if (name && value && image) {
      onSave({ id: uuid(), name, value: parseFloat(value), image })
    }
    setName("");
    setImage("");
    setValue("");
    onClose();
  }

  return (
    <div className="backdrop">
      <div className="modal">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Value"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          placeholder="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button onClick={saveGift}>Save</button>
        <button onClick={onClose} >Close</button>
      </div>
    </div>
  );
}
