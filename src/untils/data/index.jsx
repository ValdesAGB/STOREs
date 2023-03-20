export const onLine = `Veuillez-vous connecter à internet et actualiser`
export const disponible = (
  <i
    className="bi bi-emoji-smile-fill fs-4 text-success"
    title="Disponible"
  ></i>
)

export const indisponible = (
  <i
    className="bi bi-emoji-dizzy-fill fs-4 text-secondary"
    title="Indisponible"
  ></i>
)

export const profilCover = (
  <div
    style={{
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      objectFit: 'cover',
    }}
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <img
      src="https://cours-informatique-gratuit.fr/wp-content/uploads/2014/05/compte-utilisateur-1.png"
      alt="user"
      className="w-100"
      title="Dashboard"
    />
  </div>
)
