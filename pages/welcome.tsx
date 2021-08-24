const Welcome = (props) => {
  return (
    <section>
      <p>This is the welcome page!</p>
      <h2>Name</h2>
      <p>{props.name}</p>
    </section>
  )
}

export default Welcome;

export async function getStaticProps(context) {
  console.log('context ================= ', context)
  return { 
    props: { 
      name: "Anosike Osifo",
      email: "osifo@tilte.ng",
    }
  }
}