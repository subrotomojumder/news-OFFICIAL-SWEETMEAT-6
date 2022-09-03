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
        div.innerHTML = `<div onclick="displayNews('${category.category_id}','${category.category_name}')" class="category fw-semibold">${category.category_name}</div>`;
        categoryList.appendChild(div);
    });
}
showCategory()

const displayNews = async (id, cateName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    const newsBlogs = data.data;
    // count 1 category news
    const countNews = document.getElementById('count-news');
    countNews.innerHTML = `Event: Found <span class="text-warning">${newsBlogs.length}</span> items in <span class="text-success">${cateName}</span> category`;
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    newsBlogs.forEach( blog => {
        const {author, details, thumbnail_url, total_view, title, others_info,_id} = blog;
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
            <div class="row g-3 my-4 p-4 bg-white rounded-3">
                <div class="col-11 col-sm-3 text-center">
                    <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-12 col-sm-9">
                    <div class="card-body">
                        <h4 class="card-title fw-bold text-warning my-2">${title}</h4>
                        <p class="card-text"><small class="text-muted">${others_info.is_trending ? 'Published there <span class ="text-danger fw-bold">3 days ago</span> !' : 'Published there 5 days ago!'}</small></p>
                        <p class="card-text">${details.length > 500 ? details.slice(0, 500)+'....' : details}</p>
                        <div class="d-flex justify-content-between me-4">
                            <div class="d-flex align-items-center">
                                <img class="rounded-circle" src="${author ? author.img : 'unknown'}" style="width: 60px" alt="">
                                <div>
                                    <p class ="fw-bold mb-0">${author?author.name : 'unknown'}</p>
                                    Published: ${author?author.published_date : 'unknown'}
                                </div>
                            </div>
                            <div class=""><i class="fa-solid fa-eye"></i> ${total_view ? total_view : 'Hide'} view</div>
                            <button onclick="displayDetails('${_id}')" class="px-3 fw-bold pt-1 btn bg-info text-light rounded-2">See more <i class="fa-sharp fa-solid fa-arrow-right-long"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(div);
        // console.log(blog)
    });
};

const displayDetails = async detailsId => {
    const res = await fetch(``)
    console.log(detailsId)
}