import { useState, useEffect } from "react";

function FilmForm({ addFilm, filmToEdit = null, isUpdate = false }) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("Film");
    const [platform, setPlatform] = useState("Netflix");
    const [status, setStatus] = useState("İzlenecek");

    useEffect(() => {
        if (filmToEdit) {
            setTitle(filmToEdit.title);
            setType(filmToEdit.type);
            setPlatform(filmToEdit.platform);
            setStatus(filmToEdit.status);
        } else {
            setTitle("");
            setType("Film");
            setPlatform("Netflix");
            setStatus("İzlenecek");
        }
    }, [filmToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;

        addFilm({ title, type, platform, status });

        if (!isUpdate) {
            setTitle("");
            setType("Film");
            setPlatform("Netflix");
            setStatus("İzlenecek");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="row g-2">
                <div className="col-md-4">
                    <input
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Film veya dizi adı"
                    />
                </div>
                <div className="col-md-2">
                    <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                        <option>Film</option>
                        <option>Dizi</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                        <option>Netflix</option>
                        <option>Disney+</option>
                        <option>HBO</option>
                        <option>Prime Video</option>
                        <option>Diğer</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option>İzlendi</option>
                        <option>İzlenecek</option>
                    </select>
                </div>
            </div>

            <button className={`btn mt-2 ${isUpdate ? "btn-success" : "btn-primary"}`}>
                <i className={`bi ${isUpdate ? "bi-check-lg" : "bi-plus-lg"}`}></i> {isUpdate ? "Güncelle" : "Ekle"}
            </button>
        </form>
    );
}

export default FilmForm;