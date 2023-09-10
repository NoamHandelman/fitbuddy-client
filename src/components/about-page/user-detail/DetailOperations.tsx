import { Dispatch, FC, SetStateAction } from 'react';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineLine, AiOutlineDelete } from 'react-icons/ai';
import { UseMutateFunction } from '@tanstack/react-query';

interface DetailOperationsProps {
  setIsEditing: () => void;
  isEditing: boolean;
  data?: string;
  detail: string;

  deleteDetail: UseMutateFunction<string | undefined, unknown, string, unknown>;
  setDetailData: Dispatch<SetStateAction<string>>;
}

const DetailOperations: FC<DetailOperationsProps> = ({
  setIsEditing,
  isEditing,
  data,
  detail,
  deleteDetail,
  setDetailData,
}) => {
  return (
    <div className="flex space-x-2">
      <button
        type="button"
        className="hover:bg-gray-300 rounded-full p-1"
        onClick={setIsEditing}
      >
        {isEditing ? <AiOutlineLine /> : <CiEdit />}
      </button>
      {(data && detail !== 'favoriteSport') ||
      (data && detail === 'favoriteSport' && data !== 'general') ? (
        <button
          type="button"
          className="hover:bg-gray-300 rounded-full p-1"
          onClick={() => {
            deleteDetail(detail);
            setDetailData('');
          }}
        >
          <AiOutlineDelete />
        </button>
      ) : null}
    </div>
  );
};

export default DetailOperations;
