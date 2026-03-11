import { useState, useEffect } from "react";
import FilmForm from "../components/FilmForm";
import FilmList from "../components/FilmList";
import { fetchInitialFilms } from "../mockApi";

function Home() {
    const [films, setFilms] = useState([]);
    const [updateMode, setUpdateMode] = useState(false);
    const [selectedFilmIndex, setSelectedFilmIndex] = useState(null);
    const [actionColor, setActionColor] = useState(null);


    useEffect(() => {
        const storedFilms = JSON.parse(localStorage.getItem("films"));
        if (storedFilms) {
            setFilms(storedFilms);
        } else {
            fetchInitialFilms().then((data) => {
                setFilms(data);
                localStorage.setItem("films", JSON.stringify(data));
            });
        }
    }, []);

    const saveToLocal = (filmsArray) => {
        localStorage.setItem("films", JSON.stringify(filmsArray));
    };

    // 🌟 Ortak action handler
    const handleAction = (type, callback) => {
        setActionColor(type);
        callback();
        setTimeout(() => setActionColor(null), 500);
    };

    const addFilm = (film) => {
        handleAction("add", () => {
            const newFilms = [...films, film];
            setFilms(newFilms);
            saveToLocal(newFilms);
        });
    };

    const deleteFilm = (i) => {
        handleAction("delete", () => {
            const newFilms = films.filter((_, idx) => idx !== i);
            setFilms(newFilms);
            saveToLocal(newFilms);
            setUpdateMode(false);
            setSelectedFilmIndex(null);
        });
    };

    const startUpdate = (i) => {
        setSelectedFilmIndex(i);
        setUpdateMode(true);
        setActionColor("update");
    };

    const updateFilm = (updatedFilm) => {
        const newFilms = [...films];
        newFilms[selectedFilmIndex] = updatedFilm;
        setFilms(newFilms);
        saveToLocal(newFilms);
        setUpdateMode(false);
        setSelectedFilmIndex(null);
        setActionColor(null);
    };


    const resetLocalAPI = () => {
        fetchInitialFilms().then((data) => {
            setFilms(data);
            localStorage.setItem("films", JSON.stringify(data));
            setUpdateMode(false);
            setSelectedFilmIndex(null);
            setActionColor(null);
        });
    };


    const containerColor =
        actionColor === "update"
            ? "#fff3cd" // sarı
            : actionColor === "delete"
                ? "#f87171" // kırmızı
                : actionColor === "add"
                    ? "#22c55e" // yeşil
                    : "#454346"; // normal

    return (
        <div
            className="container mt-5 p-4"
            style={{
                backgroundColor: containerColor,
                minHeight: "90vh",
                transition: "0.3s",
                borderRadius: "15px",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
        >
            <h1
                className="text-center mb-4"
                style={{ fontFamily: "Arial Black", color: "#ffffff" }}
            >
                🎬 Film / Dizi Takip
            </h1>


            {updateMode ? (
                <FilmForm
                    key={`update-${selectedFilmIndex}`}
                    addFilm={updateFilm}
                    filmToEdit={films[selectedFilmIndex]}
                    isUpdate={true}
                />
            ) : (
                <FilmForm key="add-form" addFilm={addFilm} />
            )}


            <FilmList
                films={films}
                deleteFilm={deleteFilm}
                startUpdate={startUpdate}
            />


            <div className="mt-4 text-center">
                <button className="btn btn-danger" onClick={resetLocalAPI}>
                    <i className="bi bi-arrow-counterclockwise"></i> Local API Sıfırla
                </button>
            </div>
        </div>
    );
}

export default Home;