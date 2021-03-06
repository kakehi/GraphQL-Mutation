import uuidv4 from 'uuid/v4'

const Mutation = {
    
    createMovie(parent, { data }, { db }, info) {
        
        // Check if the movie title already exists. If so, throw an error due to duplication.
        const movieTitleTaken = db.movies.some((movie) => {
           return movie.title.toLowerCase() === data.title.toLowerCase()
        })

        if(movieTitleTaken){
            throw new Error('This movie title exists.')
        }

        // Creating a new movie constant which comprises of arguments passed from the mutation operator.
        const movie = {
            id: uuidv4(),
            ...data
        }

        db.movies.push(movie)

        return movie
    },

    updateMovie(parent, { id, data }, { db }, info){

        const movie = db.movies.find((movie) => movie.id === id )

        if(!movie){
            throw new Error('User not found')
        }

        const movieTitleTaken = db.movies.some((movie) => {
            return movie.title.toLowerCase() === data.title.toLowerCase()
         })

        if(movieTitleTaken){
            throw new Error('This movie title exists.')
        }

        // Update the movie title, if the new title is not null
        if(typeof data.title === 'string'){
            movie.title = data.title
        }

        // Update the movie release boolean, if the new boolean is not null
        if(typeof data.released === 'boolean'){
            movie.released = data.released
        } 
        
        return movie
    },

    deleteMovie(parent, { id }, { db }, info){

        // First, check if the movie ID exists. If it doesn't throw an error.
        const movieIndex = db.movies.findIndex((movie) => movie.id === id)

        if(movieIndex === -1){
            throw new Error('Movie does not found')
        }

        // Update the movie array.
        const deletedMovies = db.movies.splice(movieIndex, 1)

        db.actors.forEach((actor) => {
            if(actor.movie === id){
                actor.movie = null
            }
        })

        return deletedMovies[0]
    },

    createActor(parent, { data }, { db }, info) {
        
        // Check if the actor name and agent name have existed together for another instance. If so, throw an error due to duplication.
        const actorNameTaken = db.actors.some((actor) => {
           return actor.name.toLowerCase() === data.name.toLowerCase() && actor.agent.toLowerCase() === data.agent.toLowerCase()
        })

        if(actorNameTaken){
            throw new Error('This actor name exists.')
        }
        
        // Creating a new actor constant which comprises of arguments passed from the mutation operator.
        const actor = {
            id: uuidv4(),
            ...data
        }

        db.actors.push(actor)

        return actor
    },

    deleteActor(parent, { id }, { db }, info){

        // First, check if the actor ID exists. If it doesn't throw an error.
        const actorIndex = db.actors.findIndex((actor) => actor.id === id)

        if(actorIndex === -1){
            throw new Error('Actor does not found')
        }

        // Update the movie array.
        const deletedActors = db.actors.splice(actorIndex, 1)

        return deletedActors[0]
    },
}

export { Mutation as default }