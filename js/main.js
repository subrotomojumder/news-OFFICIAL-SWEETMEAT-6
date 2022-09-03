const displayCategory = async () => {
    const res = await fetch(' https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    return data.data.news_category;
}

const showCategory = async () => {
    const menu = await displayCategory();
    const categoryList = document.getElementById('category-list');
    menu.forEach( category => {
        const div = document.createElement('div');
        div.innerHTML = `<div onclick="displayNews('${category.category_id}')" class="category">${category.category_name}</div>`;
        categoryList.appendChild(div);
    });
}
showCategory()

const displayNews = async id => {
    const res = await fetch(` https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    const newsBlogs = data.data;
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    newsBlogs.forEach( blog => {
        const {author, details, thumbnail_url, total_view, title, _id} = blog;
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
            <div class="row g-3 my-4 p-2 bg-white rounded-3">
                <div class="col-11 col-sm-3 text-center">
                <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-12 col-sm-9">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${title}</h5>
                        <p class="card-text">${details}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        <div class="d-flex justify-content-between">
                        <div class="d-flex align-items-center">
                            <img class="rounded-circle" src="${author ? author.img : 'unknown'}" style="width: 60px" alt="">
                            <div>
                                <p class ="fw-bold mb-0">${author?author.name : 'unknown'}</p>
                                Published: ${author?author.published_date : 'unknown'}
                            </div>
                        </div>
                        <div class="">Views-${total_view}</div>
                        <dib class="px-3 py-2 h3 bg-info rounded-2">&#8680;</div>
                    </div>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(div);
        console.log(blog)
    });
}