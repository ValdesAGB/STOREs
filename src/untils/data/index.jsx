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

export const updateProduct = {
  modal: {
    firstModalTitle: {
      isDataLoading: 'Modifications en cours',
      notDataLoading: 'Modifications effectuées',
    },

    firstModalBody: {
      isDataLoading:
        "Vos modification sont en cours d'enregistrement. Cela peut prendre quelques secondes. Ne quittez pas cette page",
      notDataLoading: 'Vos modifications ont été bien enrégistré.',
    },
  },
}

export const deleteProduct = {
  modal: {
    firstModal: {
      Title: 'Attention cette action est irréversible.!',

      Body: `Voulez-vous vraiment supprimé ce produit.?`,
      Btn: 'Supprimer',
      BtnClassName: 'btn btn-danger',
    },
    secondModal: {
      Title: {
        isDataLoading: 'Suppression en cours',
        notDataLoading: 'Suppression effectuées',
      },
      Body: {
        isDataLoading:
          'La suppression est en cours. Cela peut prendre quelques secondes. Ne quittez pas cette page',
        notDataLoading: 'La suppression a été bien enrégistré.',
      },
    },
  },
}
