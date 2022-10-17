import { ADD,LOAD_ALL_BLOGS } from "../actions/blogType";


export const blogReducer = (state,action) => {
    const {type,payload} = action
  switch (type) {
    case ADD :
      const newBlog = {
        ...payload
      }
      return [...state,newBlog]

     case LOAD_ALL_BLOGS:
        return [...payload]
    default:
        break;
  }
}