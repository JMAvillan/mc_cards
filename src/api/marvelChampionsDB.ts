import IDeck from "../interfaces/IDeck";

const fetchDeckListApi: any = async (startingDate: number) => {
  try {
    const date = new Date(startingDate);
    const month =
      `${date.getMonth()}`.length >= 2
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`;
    const dateForQuery = `${date.getFullYear()}-${month}-${date.getDate()}`;
    const response = await fetch(
      `https://marvelcdb.com/api/public/decklists/by_date/${dateForQuery}`
    );
    const result: any = await response.json();

    return result.map((deck: IDeck) => {
      deck.meta = JSON.parse(JSON.stringify(deck.meta));
      return deck;
    });
  } catch (error) {
    throw error;
  }
};

const fetchAllCards: any = async () => {
  try {
    const response = await fetch(`https://marvelcdb.com/api/public/cards`);
    const result: any = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

const fetchAllPacks: any = async () => {
  try {
    const response = await fetch(`https://marvelcdb.com/api/public/packs`);
    const result: any = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export { fetchDeckListApi, fetchAllCards, fetchAllPacks };
