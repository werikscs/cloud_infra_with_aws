import { app } from '.'

app.listen(process.env.APP_PORT, () => {
  return console.log(
    `Express is listening at http://localhost:${process.env.APP_PORT}`,
  )
})
