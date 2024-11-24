import { base_Url } from "./base_Url";
import { commonAPI } from "./commonApi";
//Actual API call
//registerAPI -post-body
export const registerAPI=async(user)=>{
    return await commonAPI("post",`${base_Url}/register`,user,"")
}
//login API -post-body
export const loginAPI=async(user)=>{
    return await commonAPI("post",`${base_Url}/login`,user,"")
}

export const getAllBooksAPI = async (reqHeader, search = '', genre = '', sortBy = 'title', order = 'asc') => {
    // Construct query string with multiple filters
    let queryParams = '';
    if (search) queryParams += `search=${search}`;
    if (genre) queryParams += queryParams ? `&genre=${genre}` : `genre=${genre}`;
    if (sortBy) queryParams += queryParams ? `&sortBy=${sortBy}` : `sortBy=${sortBy}`;
    if (order) queryParams += queryParams ? `&order=${order}` : `order=${order}`;

    // If there are any query params, add a leading `?`
    const queryString = queryParams ? `?${queryParams}` : '';

    // Send the GET request with the query string
    return await commonAPI("get", `${base_Url}/get-books${queryString}`, "", reqHeader);
};

export const getUserBooksAPI=async(reqHeader)=>{
    return await commonAPI("get",`${base_Url}/my-books/`,"",reqHeader)
}

export const addBookAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${base_Url}/add-book`,reqBody,reqHeader)
}
export const updateBookAPI=async(bId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${base_Url}/edit-book/${bId}`,reqBody,reqHeader)
}
export const deleteBookAPI=async(bId,reqHeader)=>{
    return await commonAPI("delete",`${base_Url}/delete-book/${bId}`,"",reqHeader)
}
// Fetch book details by book ID
export const getBookDetailsAPI = async (bookId,reqHeader) => {
    return await commonAPI("get", `${base_Url}/book-detail/${bookId}`,"",reqHeader);
  };

  // Submit review for a book
  export const submitReviewAPI = async (id, reviewData,reqHeader) => {
    return await commonAPI("post", `${base_Url}/add-review/${id}`, reviewData,reqHeader);
  };
  export const deleteReviewsAPI=async(rId,reqHeader)=>{
    return await commonAPI("delete",`${base_Url}/delete-review/${rId}`,"",reqHeader)
}
    // Submit review for a book
 export const editReviewAPI = async (reviewId, reviewData, reqHeader) => {
        return await commonAPI("put", `${base_Url}/edit-review/${reviewId}`, reviewData, reqHeader);
      };
