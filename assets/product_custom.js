// variant metajs
document.addEventListener('page:loaded', function() {
  // Create and prepend the upsell-wrap section dynamically
  function createGiftWrapHTML() {
    const giftWrapContainer = document.createElement('div');
    giftWrapContainer.classList.add('upsell-wrap');

    const label = document.createElement('label');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'upsell';
    checkbox.id = 'upsell_checkbox';
    
    const span = document.createElement('span');
    span.id = 'upsell_label';
    span.textContent = 'Variant title (+variant price)';
    
    const strong = document.createElement('strong');
    strong.textContent = 'Einrichtungsservice: ';
    
    label.appendChild(checkbox);
    label.appendChild(strong);
    label.appendChild(span);
    giftWrapContainer.appendChild(label);

    // Prepend the upsell-wrap HTML to the product form wrapper
    const productFormWrapper = document.querySelector('.product-form-wrapper');
    if (productFormWrapper) {
      productFormWrapper.insertAdjacentElement('afterbegin', giftWrapContainer);
    }
  }

  // Function to update upsell-wrap label based on upsell_variant
  function updateGiftWrapLabel(variantId) {
    const upsellVariant = document.querySelector(`#variant_meta_${variantId}`);
    const giftWrapLabel = document.querySelector('#upsell_label');
    const giftWrapCheckbox = document.querySelector('#upsell_checkbox');

    if (upsellVariant && upsellVariant.hasAttribute('upsell_id')) {
      const upsellVariantTitle = upsellVariant.getAttribute('upsell-title');
      const upsellVariantPrice = upsellVariant.getAttribute('upsell-price');
      const upsell_id = upsellVariant.getAttribute('upsell_id');

      if (giftWrapLabel) {
        giftWrapLabel.textContent = `${upsellVariantTitle} (+${upsellVariantPrice})`;
      }

      if (giftWrapCheckbox) {
        giftWrapCheckbox.value = upsell_id;
      }

      // Show the upsell-wrap section if upsell variant condition is met
      const giftWrapContainer = document.querySelector('.upsell-wrap');
      const giftWrapContainer_input = document.querySelector('.upsell-wrap input');
      if (giftWrapContainer) {
        giftWrapContainer.removeAttribute('hidden');
        giftWrapContainer_input.checked = false;
      }
    } else {
      // Hide the upsell-wrap section if upsell variant condition is not met
      const giftWrapContainer = document.querySelector('.upsell-wrap');
       const giftWrapContainer_input = document.querySelector('.upsell-wrap input');
      if (giftWrapContainer) {
        giftWrapContainer.setAttribute('hidden', 'true');
        giftWrapContainer_input.checked = false;
      }
    }
  }

  // Handle variant selection change
  document.querySelector('input[name="id"]').addEventListener('change', function() {
    const selectedVariantId = this.value;

    // Check if selected variant has upsell information
    updateGiftWrapLabel(selectedVariantId);

    // Hide all metafields and show the selected variant's metafields
    const variantMetafields = document.querySelectorAll('.variant_metafields');
    variantMetafields.forEach(function(element) {
      element.setAttribute('hidden', 'true');
    });

    const selectedVariantMeta = document.querySelector('#variant_meta_' + selectedVariantId);
    if (selectedVariantMeta) {
      selectedVariantMeta.removeAttribute('hidden');
    }
  });
 // Create and add the upsell-wrap HTML on page load
  createGiftWrapHTML();
  // On page load, check the default variant and update the upsell-wrap label if necessary
  const initialVariantId = document.querySelector('input[name="id"]').value;
  if (initialVariantId) {
    updateGiftWrapLabel(initialVariantId);
  }

 
});
function update_cartdrawer_cust(){
   const cartDrawerInner = document.querySelector('#CartDrawer .drawer__inner');

  if (cartDrawerInner) {
    // Fetch the content of the home page
    fetch('/')
      .then(response => response.text())  // Get the HTML of the entire page
      .then(html => {
        // Parse the response as HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Find the .drawer__inner element within the fetched page
        const fetchedDrawerInner = tempDiv.querySelector('#CartDrawer .drawer__inner');

        if (fetchedDrawerInner) {
          // Replace the current .drawer__inner content with the fetched content
          cartDrawerInner.innerHTML = fetchedDrawerInner.innerHTML;
        }
      })
      .catch(error => {
        console.error('Error fetching content for .drawer__inner:', error);
      });
  }
}