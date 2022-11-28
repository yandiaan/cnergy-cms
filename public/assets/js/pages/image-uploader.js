var image_preview_result = document.getElementById("image_preview_result")
var image_preview_modal = document.getElementById("image_preview_modal")
var upload_image_button = document.getElementById("upload_image_button")
var image_list_parent = document.getElementById("image_list_parent")

var image_bank_modal = document.getElementById("image_bank_modal")
//  var image_title = document.getElementById("image_title")

var search_image_bank_input = document.getElementById("search_image_bank_input")
var search_image_bank_button = document.getElementById("search_image_bank_button")
let list = []
var upload_image_selected = document.getElementById("upload_image_selected")
var save_uploaded_image = document.getElementById("save_uploaded_image")
save_uploaded_image.addEventListener('click', async function () {
    var form = document.querySelectorAll("#form-upload-image input, #form-upload-image textarea");
    var fd = new FormData();
    form.forEach((el, i) => {
        const name = el.name;
        let value = el.value;
        if (name === 'image_input') {
            const file = el.files
            value = file[0]
        }
        fd.append(name, value);
        console.log(name, value);
    })
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fd.append('_token', token);
    const button = this;
    $(this).html(`
           <span class="spinner-border spinner-border-sm" role="status"
           aria-hidden="true"></span>
       Loading...
    `);
    $(this).attr("disabled", true)
    $.ajax({
        url: "/image-bank/api/create",
        type: "POST",
        data: fd,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function ({
            message,
            data: {
                image_slug
            }
        }) {
            //  console.log(message, image_slug);
            image_preview_result.src = `${path}/${image_slug}`;
            $(button).html(` <i class="bx bx-x d-block d-sm-none"></i>
            <span class="d-sm-block"><i class="bi bi-save"></i>&nbsp;&nbsp;Save
            Image</span>`);
            new Toastify({
                text: message,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                backgroundColor: "#4fbe87",
            }).showToast()
            $(button).attr("disabled", false)
            $("#image-bank").modal("hide");
            form.forEach((el, i) => {
                el.value = "";
            })
            image_preview_modal.src = `${path.split('/storage').slice(0, -1)}/assets/images/preview-image.jpg`
        },
        error: function (err) {
            form.forEach((el, i) => {
                el.value = "";
            })
            image_preview_modal.src = `${path.split('/storage').slice(0, -1)}/assets/images/preview-image.jpg`
            new Toastify({
                text: err.statusText,
                duration: 3000,
                close: true,
                gravity: "bottom",
                position: "right",
                backgroundColor: "#ff0000",
            }).showToast()
        }
    });
})

let path = document.getElementById('path_image').value;

upload_image_button.onchange = evt => {
    const [file] = upload_image_button.files
    if (file) {
        upload_image_selected.value = null;
        image_preview_modal.src = URL.createObjectURL(file)
    }
}

const upload_image_bank_button = document.getElementById("upload_image_bank_button");
const img_uploader_modal = document.getElementById("image-bank");
let imageURLTinyMCE = '';

upload_image_bank_button.addEventListener('click', function () {
    img_uploader_modal.setAttribute("tinymce-image-bank", false);
})

function selectImage() {
    const imageSrc = this.parentElement.children[0].getAttribute("src");
    var tiny_mce_image_bank = img_uploader_modal.getAttribute("tinymce-image-bank");
    if (tiny_mce_image_bank === 'false') {
        image_preview_result.src = imageSrc;
        upload_image_selected.value = imageSrc;
        upload_image_button.value = null;
        return
    }

    const targetTinyMCE = img_uploader_modal.getAttribute("target-mce");
    const oldTextTinyMCETarget = tinymce.get(targetTinyMCE).getContent();
    tinymce.get(targetTinyMCE).setContent(
        oldTextTinyMCETarget + 
        `
        <img src="${imageSrc}" alt="" data-mce-src="${imageSrc.split("http://127.0.0.1:8000")[1]}">
        `
    );
    imageURLTinyMCE = imageSrc;
    $('#image-bank').removeClass("show").css("display", "none")
}

async function search() {
    const query = '?title=' + search_image_bank_input.value;
    image_list_parent.innerHTML = `<div class="spinner-border text-primary mt-3" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;
    const data = await fetchData(query);
    list = makeList(data);
    image_list_parent.innerHTML = list
    var button_image_bank_modal_arr = document.querySelectorAll(".button_image_bank_modal")
    button_image_bank_modal_arr.forEach(item => {
        item.addEventListener('click', selectImage);
    })
}

async function fetchData(query = '') {
    const url = `/image-bank/api/list/${query}`;
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const data = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": token
            },
            method: 'get',
            credentials: "same-origin",
        })
        .then((data) => {
            return data.json()
            // window.location.href = redirect;
        })
        .catch(function (error) {
            console.log(error);
        });

    return data;
}


async function addEventListeners() {
    image_list_parent.innerHTML = `<div class="spinner-border text-primary mt-3" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;
    const data = await fetchData();
    list = makeList(data);
    image_list_parent.innerHTML = list

    var button_image_bank_modal_arr = document.querySelectorAll(".button_image_bank_modal")
    button_image_bank_modal_arr.forEach(item => {
        item.addEventListener('click', selectImage);
    })
    search_image_bank_button.addEventListener('click', search);
}

function makeList(data) {
    let imageList = '';
    data.map((el, i) => {
        const {
            title,
            slug,
            caption
        } = el;
        let str = `
           <div class="image-card border p-0 image-card border p-0 d-flex flex-column align-items-center">
               <img src="${path}/${slug}"
                   alt="" class="w-100 image_bank_modal">
               <p class="mx-2 font-14 mt-3 mb-1">${title}</p>
               <span class="mx-2 btn-warning font-14 w-100 button-action button_image_bank_modal" data-bs-dismiss="modal"><i
                       class="bi bi-plus-circle"></i>&nbsp;&nbsp;Select</span>

           </div>`

        imageList += str;
    })

    return imageList;
}

addEventListeners();

//  button_image_bank_modal.addEventListener('click', function () {
//      const parent = this.parentNode;
//      console.log(parent);
//  })
