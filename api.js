const mainContent = () => {
    const searchMeal = document.getElementById('search_meal').value
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchMeal}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.meals == null) {
                invalidInput();
            }
            else {
                displayItem(data.meals)
            }
        })
    // invalidInput function display a message if user input a invalid food type
    const invalidInput = () => {
        document.getElementById('invalid_input').innerText = "No Data Found"
        document.getElementById('invalid_input').style.display = "block"
        document.getElementById('container').style.display = "none"
    }
    // display food item
    const displayItem = item => {
        document.getElementById('container').style.display = "grid"
        document.getElementById('invalid_input').style.display = "none"

        const container = document.getElementById('container')
        // All search item append in the the container
        item.forEach(data => {
            const eachItem = document.createElement('div')
            eachItem.setAttribute("class", "item_area")
            const productInfo =
                `<img class="foodImg " src="${data.strMealThumb}">
               <h4>${data.strMeal} </h4>
               <p class="food_id">${data.idMeal}</p>
               `
            eachItem.innerHTML = productInfo
            container.appendChild(eachItem)
        });
        // if user click any item here all information passed in Ingredient function for display ingredient
        document.querySelectorAll('.item_area').forEach(item => {
            item.addEventListener('click', () => {
                const mealId = (item.getElementsByTagName('p')[0].innerText);
                const imgUrl = (item.getElementsByTagName('img')[0].getAttribute('src'));
                const mealName = (item.getElementsByTagName('h4')[0].innerText);
                InGradient(imgUrl, mealName, mealId)
            })
        })
    }
}


const InGradient = (imgUrl, mealName, mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayIngredient(data.meals[0]))

    // display item img, name and all ingredient
    const displayIngredient = data => {
        var ingredientContainer = document.getElementById('display_ingredient')
        const mealInfo = `
        <img src="${imgUrl}">
        <h2>${mealName}</h2> 
        <h3>Ingredient</h3>`
        ingredientContainer.innerHTML =mealInfo
        let i = 1;
        while (data[`strIngredient${i}`] != "") {
            const p = document.createElement('p')
            p.innerText = data[`strIngredient${i}`]
            ingredientContainer.appendChild(p)
            i++
        }
    }
}