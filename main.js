async function getImages(replace = true) {
    const min = 1, max = 25;
    let page = Math.floor(Math.random() * (max - min + 1) + min);
    
    const response = await fetch("https://picsum.photos/v2/list?limit=4&page=" + page);
      const images = await response.json();
      
      let newImages = '';
      images.forEach((image, index) => {
        let url = "https://picsum.photos/id/" + image.id + "/400/400";
        
        newImages += `
        <div class="col-6 text-center p-2 position-relative">
          <img class="photos" src="${url}" />
          <div class="info ps-3 py-2">
            <h4>${image.author}</h4>
            <p class="mb-0">${image.url}</p>
          </div>
        </div>
        `;
      });
      
      if(replace) {
        document.getElementById('images').innerHTML = newImages;
      } else {
        document.getElementById('images').insertAdjacentHTML('beforeend', newImages);
      }
      const checkElement = document.getElementById("flexSwitchCheckChecked");
      checkElement.checked = false;
      checkElement.dispatchEvent(new Event("change"));
    }
    
    function toggleGrayscale(event) {
      const checked = event.target.checked;
      
      const photos = document.getElementsByClassName("photos");
      for (let i = 0; i < photos.length; i++) {
        let url = new URL(photos[i].src);
        
        if (checked) {
          url.searchParams.set("grayscale", true);
        } else {
          url.searchParams.delete("grayscale", true);
        }
        
        photos[i].src = url.href;
      }
    }
  