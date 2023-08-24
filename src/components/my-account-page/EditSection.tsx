import { ChangeEvent, FC } from 'react';
import { AiOutlineLine } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import Input from '@/components/ui/Input';

interface EditSectionProps {
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isInputVisible: boolean;
  changeInputVisibility: () => void;
  resetInput: () => void;
}

const EditSection: FC<EditSectionProps> = ({
  placeholder,
  type,
  name,
  value,
  changeInputVisibility,
  isInputVisible,
  onChange,
  resetInput,
}) => {
  return (
    <section className="w-80 rounded-lg shadow-lg bg-white m-8 p-4">
      <div className="flex flex-row justify-between mb-2">
        <h2>{placeholder}</h2>
        <button
          type="button"
          className="hover:bg-gray-200 rounded-full p-1"
          onClick={() => {
            changeInputVisibility();
            resetInput();
          }}
        >
          {isInputVisible ? <AiOutlineLine /> : <CiEdit />}
        </button>
      </div>
      {isInputVisible && (
        <Input
          autoFocus={true}
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
    </section>
  );
};

export default EditSection;
