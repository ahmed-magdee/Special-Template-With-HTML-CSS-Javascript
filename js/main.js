let menuLinks = document.querySelector(".menu-links") // The Toggle Menu
let allLinks = document.querySelector(".links") // The Ul Links
let gearIcon = document.querySelector(".settings-menu .setting-gear .gear") // Gear Icon
let settingsMenu = document.querySelector(".settings-menu") // Settings Menu
let settingsLinksUl = document.querySelectorAll(".option-shape .colors-ul li") // Colors Li
let landingSection = document.querySelector(".landing-section") // Landing Section
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"] // Array Of Imgs
let imgsSettings = document.querySelectorAll(".image-settings img") // Imgs In Settings
let selectYesOrNo = document.querySelectorAll(".select-img span") // Select Yes Or No
let linksHeader = document.querySelectorAll(".links li a")
let aboutUs = document.querySelector(".about-us")
let skillsSection = document.querySelector(".our-skills")
let gallery = document.querySelector(".our-gallery")
let timeline = document.querySelector(".timeline")
let spanPregress = document.querySelectorAll(".our-skills .skill-progress .prog span")
let imgGallery = document.querySelectorAll(".our-gallery .image-gallery img")
let featurs = document.querySelector(".our-features")
let testimonials = document.querySelector(".testimonials")
let contactUs = document.querySelector(".contact-us")
let scrollToTop = document.querySelector(".scroll-to-top")
let buttonReset = document.querySelector(".settings-menu .reset-value")
let colorLocalStorage = localStorage.getItem("main-color") // Main Color At LocalStorage
let imgsLocalStorage = localStorage.getItem("localStorage-img") // Image In LocalStorage
let spanLocalStorage = localStorage.getItem("span-status") // Span LocalStorage
let checkBG = false // To Check The Background
let length = 1 // To Start The Function Background
let groundInterval; // SetInterval

menuLinks.onclick = function (e) { //Onclick On The Toggle Menu
  e.stopPropagation()
  this.classList.toggle("open")
  allLinks.classList.toggle("open")
}
function scrollToSection(elements) { // Header Links Scroll
  elements.forEach(element => {
    element.addEventListener("click", (e) => {
      e.preventDefault()
      document.querySelector(e.target.dataset.scroll).scrollIntoView({
        behavior: "smooth"
      })
    })
  }) 
}
scrollToSection(linksHeader) // Header Links Scroll
document.addEventListener("click", (e) => { // To Close The Menu Header
  if (e.target !== menuLinks && e.target !== allLinks) {
    if (allLinks.classList.contains("open")) {
      menuLinks.classList.toggle("open")
      allLinks.classList.toggle("open")
    }
  }
})
allLinks.onclick = function(e) { // Stop Propagation Of links Header
  e.stopPropagation()
}
gearIcon.onclick = function () { // Gear Icon To Close And Open The Settings
  this.classList.toggle("fa-spin")
  settingsMenu.classList.toggle("open")
}
document.addEventListener("click", (e) => { // To Close The Menu Settings
  if (e.target !== settingsMenu) {
    if (settingsMenu.classList.contains("open")) {
      settingsMenu.classList.remove("open")
      gearIcon.classList.remove("fa-spin")
    }
  }
})
settingsMenu.onclick = function (e) { // Stop The Propagation Of Settings Menu
  e.stopPropagation()
}
if (colorLocalStorage !== "") { // Change The Color By LocalStorage
  document.body.style.setProperty("--main-color", colorLocalStorage)
  settingsLinksUl.forEach(li => {
    if (colorLocalStorage === li.dataset.color) {
      removeClass (settingsLinksUl)
      li.classList.add("active")
    }
  })
}
settingsLinksUl.forEach(li => { // Send Colors To LocalStorage And Change Style The Page
  li.onclick = function () {
    removeClass (settingsLinksUl)
    this.classList.add("active")
    document.body.style.setProperty("--main-color", this.dataset.color)
    localStorage.setItem("main-color", this.dataset.color)
  }
})
function removeClass (elements) { // Function To Remove On All Elements
  elements.forEach(ele => {
    ele.classList.remove("active")
  })
}
function changeTheBackground () { // Change The Background
  checkBG = true
  removeClass (imgsSettings)  
  clearInterval(groundInterval)
    groundInterval = setInterval(() => {
      landingSection.style.backgroundImage = `url(imgs/${imgsArray[length]})`
      length++
      if (length >= imgsArray.length) {
        length = 0
      }
    }, 5000);
}
changeTheBackground ()
selectYesOrNo.forEach(span => { // LocalStorage Span
  removeClass (selectYesOrNo)
  if (spanLocalStorage === "yes") {
    checkBG = true
    changeTheBackground ()
    document.querySelector(".yes").classList.add("active")
    removeClass (imgsSettings)
  } else if (spanLocalStorage === "no") {
    checkBG = false
    clearInterval(groundInterval)
    removeClass (selectYesOrNo)
    document.querySelector(".no").classList.add("active")
    removeClass (imgsSettings)
  } else {
    removeClass (selectYesOrNo)
  }
})
selectYesOrNo.forEach(span => { // Change The Select Of Spans
  span.onclick = function () {
    checkBG = false
    removeClass (selectYesOrNo)
    removeClass (imgsSettings)
    localStorage.removeItem("localStorage-img")
    this.classList.add("active")
    if (this.dataset.select === "yes") {
      checkBG = true
      changeTheBackground ()
      localStorage.setItem("span-status", this.dataset.select)
    } else if (this.dataset.select === "no") {
      checkBG = false
      clearInterval(groundInterval)
      localStorage.setItem("span-status", this.dataset.select)
    }
  }
})
if (imgsLocalStorage !== null) {
  checkBG = false
  clearInterval(groundInterval)
  landingSection.style.backgroundImage = `url(imgs/${imgsLocalStorage})`
  imgsSettings.forEach(imgActive => {
    if (imgsLocalStorage === imgActive.alt) {
      removeClass (imgsSettings)
      imgActive.classList.add("active")
    }
  })
}
imgsSettings.forEach(img => { // Imgs Settings Section
  if (checkBG === true) {
    document.querySelector(".yes").classList.add("active")
  }
  img.onclick = function () { // Imgs Settings Section
    checkBG = false
    removeClass (imgsSettings)
    removeClass (selectYesOrNo)
    window.localStorage.removeItem("span-status")
    checkBG = false
    clearInterval(groundInterval)
    this.classList.add("active")
    landingSection.style.backgroundImage = `url(imgs/${img.alt})`
    localStorage.setItem("localStorage-img", img.alt)
  }
})
buttonReset.onclick = function() {
  localStorage.clear()
  window.location.reload()
}
window.onscroll = function () {  // Window Scroll
  if (window.scrollY >= (skillsSection.offsetTop - 100)) {
    spanPregress.forEach(span => {
      span.style.width = span.dataset.width
    })
  }
  sectionOpacityOne(aboutUs)
  sectionOpacityOne(gallery)
  sectionOpacityOne(featurs)
  sectionOpacityOne(timeline)
  sectionOpacityOne(testimonials)
  sectionOpacityOne(contactUs)
  scrollButton(scrollToTop)
}
  spanPregress.forEach(span => { // The Number Of Width The Spans Progress
  let widthSpan = document.createElement("span")
  widthSpan.className = "width-num"
  widthSpan.appendChild(document.createTextNode(span.dataset.width))
  span.appendChild(widthSpan)
})
imgGallery.forEach(img => { // Img Gallery
  img.onclick = function() {
    let overlay = document.createElement("div")
    overlay.className = "overlay"
    let popup = document.createElement("div")
    popup.className = "popup"
    let image = document.createElement("img")
    image.src = img.src
    popup.appendChild(image)
    let closeButton = document.createElement("button")
    closeButton.classList = "close-button"
    closeButton.appendChild(document.createTextNode('X'))
    let download = document.createElement("a")
    download.className = "download"
    download.setAttribute("href", img.src)
    download.setAttribute("target", "_blank")
    download.appendChild(document.createTextNode("Download"))
    popup.appendChild(download)
    popup.appendChild(closeButton)
    document.body.appendChild(overlay)
    document.body.appendChild(popup)
  }
})
document.addEventListener("click", (e) => { // Document On Click
  if (e.target.classList.contains("overlay")) {
    document.querySelector(".overlay").remove()
    document.querySelector(".popup").remove()
  }
  if (e.target.classList.contains("close-button")) {
    document.querySelector(".overlay").remove()
    document.querySelector(".popup").remove()
  }
})
function sectionOpacityOne(section) { // Sections To Opacity 1
  if (window.scrollY >= (section.offsetTop - 350)) {
    section.style.opacity = "1"
  }
} 
function scrollButton(button) { // Button Scroll To Top
  if (window.scrollY >= 500) {
    button.classList.add("show")
  } else {
    button.classList.remove("show")
  }
  button.onclick = function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
}
