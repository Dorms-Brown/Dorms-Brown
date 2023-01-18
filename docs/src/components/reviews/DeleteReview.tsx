// props for deleting a review
interface DeleteReviewProps {
  reviewData: Map<string, any>;
  index: number;
}

/**
 * Deleting a review component that is in charge of deleting a review
 * @param reviewData - the reviewData to delete
 * @param index - the index inside of the reviews array to delete 
 * @returns - the Delete Review component 
 */
const DeleteReview = ({ reviewData, index }: DeleteReviewProps) => {
  
  /**
   * Delete the dorm from the dorms collection
   * @param dormid - the id of the dorm
   * @param dormtype - the type of the dorm 
   * @param user - the user who wrote the review 
   * @param timestamp - the timestamp of when the user wrote the review 
   */
  const deleteFromDormDocument = async (dormid: string, dormtype : string, user : string, timestamp: string) => {

    const review = JSON.stringify({ index, dormid, dormtype, timestamp})

    // call the delete review backend API endpoint from the dorm 
    fetch(`http://localhost:8080/profile/${user}/delete-review/dorm`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      },
      body: review
    })
  };

  /**
   * Delete the dorm from the users collection 
   * @param dormid - the id of the dorm 
   * @param dormtype - the type of the dorm 
   * @param user - the user who wrote the review 
   * @param timestamp - the timestamp of when the user wrote the regview 
   */
  const deleteFromUserDocument = async (dormid: string, dormtype : string, user : string, timestamp: string)  => {

    const review = JSON.stringify({ index, dormid, dormtype, user, timestamp})

    // call the delete review backend API endpoint from the user 
    fetch(`http://localhost:8080/profile/${user}/delete-review/user`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      },
      body: review
    })
  };

  // whenever the delete button is pressed
  const onDelete = () => {
    const dormid = reviewData.get('dormid')
    const dormtype = reviewData.get('dormType')
    const user =  reviewData.get('user')
    const timestamp = reviewData.get('timestamp')
    deleteFromDormDocument(dormid, dormtype, user, timestamp);
    deleteFromUserDocument(dormid, dormtype, user, timestamp);
    window.location.reload()
  };

  return (
    <div aria-describedby="Delete review">
      <button onClick={onDelete} className="mt-2">
        <b className="hover:underline">Delete Review</b>
      </button>
    </div>
  );
};

export default DeleteReview;
