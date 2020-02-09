const baseUrl = "http://localhost:3080/albums";

class AlbumService {
    static async findAll() {
        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        };
        return await fetch(`${baseUrl}`, init);
    }

    static async remove(id) {
        const init = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        };
        return await fetch(`${baseUrl}/${id}`, init);
    }

}

export default AlbumService;