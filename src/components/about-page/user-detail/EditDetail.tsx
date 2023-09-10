import Input from '@/components/ui/Input';
import { Profile } from '@/types/profile';
import { UseMutateFunction } from '@tanstack/react-query';
import { Dispatch, FC, SetStateAction } from 'react';

interface EditDetailProps {
  detail: string;
  detailData: string;
  setDetailData: Dispatch<SetStateAction<string>>;
  type: string;
  setIsEditing: () => void;
  editProfile: UseMutateFunction<
    | {
        profile?: Profile | undefined;
        message: string;
      }
    | undefined,
    unknown,
    {
      detail: string;
      data: string;
    },
    unknown
  >;
}

const SPORTS = [
  'general',
  'aerobic',
  'bodybuilding',
  'powerlifting',
  'crossfit',
];

const EditDetail: FC<EditDetailProps> = ({
  detail,
  detailData,
  setDetailData,
  type,
  setIsEditing,
  editProfile,
}) => {
  const onSave = () => {
    if (detailData) {
      const updatedData =
        type === 'date' ? new Date(detailData).toISOString() : detailData;
      editProfile({ detail, data: updatedData });
      setIsEditing();
    }
  };

  return (
    <div className="w-full">
      {detail === 'favoriteSport' ? (
        <select
          className="bg-white my-4 rounded-lg w-full px-2 focus:outline-none"
          value={detailData}
          onChange={(e) => setDetailData(e.target.value)}
        >
          {SPORTS.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
      ) : type === 'date' ? (
        <Input
          className="bg-white my-4 rounded-lg w-full px-2 border-b-0"
          autoFocus
          type={type}
          value={detailData}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDetailData(e.target.value)
          }
        />
      ) : (
        <textarea
          className="bg-white my-4 rounded-lg w-full p-2 resize-none focus:outline-none"
          autoFocus
          value={detailData}
          onChange={(e) => setDetailData(e.target.value)}
        />
      )}
      <div className="flex justify-center items-center space-x-4">
        <button
          type="button"
          className={`${
            !detailData && 'cursor-not-allowed'
          } hover:bg-gray-300 rounded-md p-1`}
          disabled={!detailData}
          onClick={onSave}
        >
          save
        </button>
        <button
          type="button"
          className="hover:bg-gray-300 rounded-md p-1"
          onClick={setIsEditing}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export default EditDetail;
