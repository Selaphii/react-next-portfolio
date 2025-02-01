export const fetchData = async () => {
    try {
      const response = await fetch(process.env.MICROCMS_API_URL, {
        headers: {
          "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
        },
      });
      const data = await response.json();
      return data.contents || [];
    } catch (error) {
      console.error("Failed to fetch works:", error);
      return [];
    }
  };
  