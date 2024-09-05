export default function useItemCounter() {
  const itemCounter = (value, index, attr) => {
    return value.filter((x) => x[attr] == index).length;
  };

  return [itemCounter];
}
