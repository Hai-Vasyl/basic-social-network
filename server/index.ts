import express from "express"
const app = express()
console.log("sdfsfs")
const PORT = 5000

app.use(express.static("dist/client"))

app.get("*", (req, res) => {
  res.json({ data: "works something---" })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))