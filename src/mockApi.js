export const fetchInitialFilms = () => {
    // Sayfa ilk açıldığında çekilecek örnek veriler
    return Promise.resolve([
        { title: "Inception", type: "Film", platform: "Netflix", status: "İzlenecek" },
        { title: "Stranger Things", type: "Dizi", platform: "Netflix", status: "İzlendi" }
    ]);
};