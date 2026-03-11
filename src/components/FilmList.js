function FilmList({ films, deleteFilm, startUpdate }) {
    return (
        <div className="row">
            {films.map((film, index) => (
                <div key={index} className="col-md-4 mb-3">
                    <div className="card shadow-sm hover-shadow position-relative">

                        {/* ✅ İzlenmiş film/dizi işareti */}
                        {film.status === "İzlendi" && (
                            <i className="bi bi-check-circle-fill watched-tick"></i>
                        )}

                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{film.title}</h5>
                            <p className="card-text mb-1"><strong>Tür:</strong> {film.type}</p>
                            <p className="card-text mb-1"><strong>Platform:</strong> {film.platform}</p>
                            <p className="card-text mb-3"><strong>Durum:</strong> {film.status}</p>

                            <div className="mt-auto d-flex justify-content-between">
                                <button className="btn btn-warning btn-sm" onClick={() => startUpdate(index)}>
                                    <i className="bi bi-pencil"></i> Güncelle
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteFilm(index)}>
                                    <i className="bi bi-trash"></i> Sil
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FilmList;