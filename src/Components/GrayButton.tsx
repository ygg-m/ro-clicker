interface Props {
  name: string;
  onClick?: () => void;
}

export const GrayButton = ({ name, onClick }: Props) => {
  return (
    <button className="bg-gray-button max-h-12 rounded-lg border border-gray-400 capitalize hover:border-gray-700" onClick={onClick}>
      {name}
    </button>
  );
};
