// add product to localstorage
export const addFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage()
    if(!favorites.some((p) => p._id === product._id)) {
        favorites.push(product)
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}

// remove favorites from a localstorage
export const removeFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage()
    const updateFavorites = favorites.filter((product) => product._id !== productId)
    localStorage.setItem("favorites", JSON.stringify(updateFavorites))
}

// retrive favorites form a localstorage
export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites")
    return favoritesJSON ? JSON.parse(favoritesJSON) : []
}