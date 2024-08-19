export const fetchTideData = async (year: number, month: number, day: number) => {
  try {
    const url = `https://tide736.net/api/get_tide.php?pc=45&hc=2&yr=${year}&mn=${month}&dy=${day}&rg=week`;
    console.log('リクエストURL:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`ネットワークレスポンスが正常ではありません: ${response.status}`);
    }
    console.log('response:', response);
    const text = await response.text();
    console.log('取得したデータ（テキスト）:', text);
    
    try {
      const data = JSON.parse(text);
      console.log('パースしたデータ:', data);
      return data;
    } catch (parseError) {
      console.error('JSONのパースに失敗しました:', parseError);
      throw new Error('レスポンスが有効なJSONではありません');
    }
  } catch (error) {
    console.error('潮汐データの取得に失敗しました:', error);
    throw error;
  }
};