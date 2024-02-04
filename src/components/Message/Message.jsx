
export const Message = ({msg, bgColor}) => {
    let styles = {
        padding: "3rem",
        marginTop: "1rem",
        marginBottom: "1rem",
        textAlign: "center",
        backgroundColor: bgColor,
        color: "#f2f2f2",
        fontWeight: "bold",
        width: "50%"
    }


  return (
    <>
        <div style={styles}>
            <p>{msg}</p>
        </div>
    </>
    
  )
}
