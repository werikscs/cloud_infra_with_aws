import { app } from '.'

app.listen(process.env.APP_PORT_DEV, () => {
  return console.log(
    `Express is listening at http://host.docker.internal:${process.env.APP_PORT_DEV}`,
  )
})
