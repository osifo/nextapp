import nc from 'next-connect';

const handler =  nc()
  .get((req, res) => {
    res.json({ data: "this is the get endpoint" });
  })
  .put((req, res) => {
    res.json({ data: 'this is the put endpoint' });
  })
  .post((req, res) => {
    res.json({ data: "this is the post endpoint" });
  });

  export default handler;