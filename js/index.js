
const getDataAPI = () => {
  const messagesJson = [
    {
      "name": "Hilary",
      "date": "1",
      "message": "Lorem ipsum dolor, sit amet"
    },
    {
      "name": "Ashley",
      "date": "4",
      "message": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores iusto quam, cum quaerat sint odio? Ut, architecto, tempora numquam beatae aut alias debitis dolorum vitae ullam voluptas excepturi quibusdam eligendi!"
    },
    {
      "name": "Emma",
      "date": "21",
      "message": "Lorem debitis dolorum vitae ullam voluptas excepturi quibusdam eligendi"
    },
    {
      "name": "Scarlett",
      "date": "7",
      "message": "numquam beatae"
    },
    {
      "name": "Bonnie",
      "date": "2",
      "message": "consectetur adipisicing elit. Maiores iusto quam, cum quaerat sint odio?"
    },
    {
      "name": "Bruce",
      "date": "1",
      "message": "voluptas excepturi quibusdam eligendi!"
    },
    {
      "name": "Matthew",
      "date": "14",
      "message": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores iusto quam, cum quaerat sint odio?"
    },
    {
      "name": "James",
      "date": "24",
      "message": "vitae ullam voluptas excepturi quibusdam eligendi"
    },
    {
      "name": "Abigail",
      "date": "3",
      "message": "numquam beatae aut alias debitis"
    },
    {
      "name": "Amelia",
      "date": "12",
      "message": "Maiores iusto"
    },
    {
      "name": "Maxwell",
      "date": "10",
      "message": "Ut, architecto, tempora numquam beatae aut alias"
    },
    {
      "name": "Elizabeth",
      "date": "5",
      "message": "ipsum dolor, sit"
    },
    {
      "name": "Michael",
      "date": "19",
      "message": "debitis dolorum"
    },
    {
      "name": "Stephany",
      "date": "23",
      "message": "architecto, tempora numquam beatae aut alias debitis dolorum vitae ullam voluptas excepturi"
    },
    {
      "name": "Margaret",
      "date": "1",
      "message": "Maiores iusto quam"
    },
    {
      "name": "Victoria",
      "date": "17",
      "message": "adipisicing elit."
    },
    {
      "name": "Thomas",
      "date": "18",
      "message": "adipisicing elit. Maiores iusto"
    },
    {
      "name": "Mila",
      "date": "8",
      "message": "aut alias debitis"
    },
    {
      "name": "Emily",
      "date": "22",
      "message": "excepturi quibusdam eligendi!"
    },
    {
      "name": "Melody",
      "date": "6",
      "message": "quam, cum quaerat sint odio? Ut, tempora numquam beatae aut alias debitis dolorum vitae ullam voluptas excepturi"
    },
    {
      "name": "Mary",
      "date": "24",
      "message": "a numquam beatae aut alias dolorum vitae ullam voluptas excepturi"
    },
    {
      "name": "Madelyn",
      "date": "9",
      "message": "iusto quam, cum quaerat sint odio? Ut, architecto, tempora numquam beatae aut alias debitis dolorum"
    },
    {
      "name": "Jimmy",
      "date": "2",
      "message": "dolorum vitae ullam voluptas excepturi quibusdam eligendi"
    },
    {
      "name": "Charlotte",
      "date": "1",
      "message": "aut alias debitis dolorum"
    },
    {
      "name": "Maverick",
      "date": "21",
      "message": "Maiores iusto quam, cum quaerat sint odio? Ut, architecto, tempora numquam beatae aut alias debitis dolorum vitae ullam voluptas excepturi"
    },
    {
      "name": "Melanie",
      "date": "1",
      "message": "eligendi elit."
    }]

    return messagesJson
}
// return simulating data coming from an api
const data = getDataAPI()

// application states
const state = {
  page: 1,
  perPage: 10,
  get totalPages() {
    return Math.ceil(data.length / this.perPage)
  },
  get nButtons() {
    return this.totalPages < 5 ? this.totalPages : 5
  }
}

// Actions for comment
const comments = {
  container: document.querySelector(".c-post__comments"),

  generateCommentTags(currentComments) {
    return currentComments.map(({ name, message, date }, i) => {
      const card = document.createElement("div")
      card.classList.add("c-pagination__card")
      card.setAttribute("data-comment", i)
      card.innerHTML = `
      <div class="c-post__comment">
        <div class="c-post__comment__image"></div>
        <div class="c-post__comment__body">
          <div class="c-post__comment__content">
            <a>${name}</a>
            <span>${message}</span>
          </div>
          <div class="c-post__comment__actions">
            <a href="#">Curtir</a>
            <a href="#">Responder</a>
            <a href="#" onclick="comments.delete(${i})">Excluir</a>
            <span>${date} h</span>
          </div>
        </div>
      </div>`
      return card
    })
  },
  update() {
    const page = state.page - 1
    const start = page * state.perPage
    const end = start + state.perPage
    const currentComments = data.slice(start, end)

    const commentsTags = this.generateCommentTags(currentComments)
    this.render(commentsTags)
    buttons.update()
    this.container.scroll(0, 0)
  },
  render(commentsTags) {
    this.container.innerHTML = ""
    this.container.append(...commentsTags)
  },
  delete(numberCard){
    const card = document.querySelector(`[data-comment='${numberCard}']`)
    card.remove()
  }
}

// Actions available for buttons 
const buttonActions = {
  begin() {
    state.page = 1
  },
  prev() {
    state.page--
    if (!state.page) state.page = 1
  },
  next() {
    state.page++
    if (state.page > state.totalPages) state.page = state.totalPages
  },
  end() {
    state.page = state.totalPages
  },
  goTo(number) {
    state.page = Number(number)
  }
}

// Actions for pagination buttons
const buttons = {
  container: document.querySelector(".c-post__buttons__numbers"),
  prev: document.querySelector("[data-controller='prev']"),
  next: document.querySelector("[data-controller='next']"),

  generateButtons() {
    const { leftMax, rightMax } = this.calculateMax()

    const buttons = []
    for (let i = leftMax; i <= rightMax; i++) {
      const button = document.createElement("button")
      button.textContent = i
      button.setAttribute("data-controller", i)
      if (state.page == i) button.classList.add("active")
      buttons.push(button)
    }
    return buttons
  },
  update() {
    const buttons = this.generateButtons()
    this.changePrevNext()
    this.renderPageNumbers(buttons)
  },
  renderPageNumbers(buttons) {
    this.container.innerHTML = ""
    this.container.append(...buttons)
  },
  changePrevNext() {
    this.prev.classList.remove("hidden")
    this.next.classList.remove("hidden")

    if (state.page < 2) this.prev.classList.add("hidden")
    if (state.page >= state.totalPages) this.next.classList.add("hidden")
  },
  calculateMax() {
    const { page } = state

    const calcLeft = page - Math.floor(state.nButtons / 2)
    let leftMax = calcLeft < 1 ? 1 : calcLeft

    const calcRight = page + Math.floor(state.nButtons / 2)
    let rightMax = calcRight > state.totalPages ? state.totalPages : calcRight

    if (state.page > state.totalPages - 2) {
      leftMax = leftMax - ((state.page - (state.totalPages - state.nButtons)) - Math.ceil(state.nButtons / 2))
    }

    if (rightMax < state.nButtons) {
      rightMax = rightMax + (state.nButtons - rightMax)
    }

    return { leftMax, rightMax }
  }
}

// General publishing actions
const publication = {
  totalComments: document.querySelector(".total-comments"),
  totalLikes: document.querySelector(".total-likes"),
  messages: [...data],
  numberLikes: 87,

  updateTotalComments(){
    this.totalComments.textContent = data.length + " comments"
  },
  addLike(){
    this.numberLikes++
    this.totalLikes.textContent = this.numberLikes
  }
}

const start = () => {
  publication.updateTotalComments()
  comments.update()
}
// Start application
start()


// EVENTS
const handleButtons = ({ target: el }) => {
  const controller = el.getAttribute("data-controller")
  if (!controller) return

  const isNumber = Number(controller)
  if (isNumber) {
    buttonActions.goTo(controller)
    comments.update()
    return
  }
  const fn = buttonActions[controller]
  fn()
  comments.update()
}

const c_buttons = document.querySelector(".c-post__buttons")
c_buttons.addEventListener("click", handleButtons)