const loadCategory = async () => {
    const res = await fetch(' https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    return data.data.news_category;
}

const showCategory = async () => {
    const menu = await loadCategory();
    const categoryList = document.getElementById('category-list');
    menu.forEach( category => {
        const div = document.createElement('div');
        div.innerHTML = `<div onclick="displayNews('${category.category_id}','${category.category_name}')" class="category fw-semibold btn">${category.category_name}</div>`;
        categoryList.appendChild(div);
    });
}
showCategory();

const displayNews = async (id, cateName) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    loaderSpinner(true);
    
    // all category news load and display
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    const newsBlogs = data.data;
    // array object short by total_view
    newsBlogs.sort((a, b) => b.total_view > a.total_view ? 1 : b.total_view < a.total_view ? -1 : 0);
    // count news items and show display
    const countNews = document.getElementById('count-news');
    countNews.innerHTML = `Event: Found <span class="text-warning">${newsBlogs.length}</span> items in <span class="text-primary">${cateName}</span> category`;
    
    newsBlogs.forEach( blog => {
        const {author, details, thumbnail_url, total_view, title, others_info,_id} = blog;
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
            <div class="row g-3 my-4 p-4 bg-white rounded-3">
                <div class="col-11 col-sm-3 text-center">
                    <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-12 col-sm-9 my-auto">
                    <div class="card-body">
                        <h4 class="card-title fw-bold text-primary my-2">${title}</h4>
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
                            <div class=""><i class="fa-solid fa-eye"></i> ${total_view ? total_view : 'Hide'}M</div>
                            <button onclick="loadDetails('${_id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal" class="px-3 fw-bold pt-1 btn btn-light text-muted rounded-2">See more <i class="fa-sharp fa-solid fa-arrow-right-long"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(div);
        // console.log(blog)
    });
    loaderSpinner(false);
};
// load news detail 
const loadDetails = async newsId => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML ='';
    const res = await fetch(` https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await res.json();
    const newsDetails = data.data[0];
    console.log(newsDetails)
    const {author, details, image_url, title, rating} = newsDetails;
    modalContainer.innerHTML = `
    <div class="modal-content text-center">
        <img src="${image_url}" class="img-fluid rounded-start" alt="...">
        <div class="modal-header">
            <h5 class="modal-title text-warning" id="newsDetailModalLabel">${title}</h5>
        </div>
        <div class="modal-body">
            <img class="rounded-2" src="${author ? author.img : 'unknown'}" style="width: 60px" alt="">
            <p class ="fw-bold mb-0">${author?author.name : 'unknown'}</p>
            <p class ="mb-0">Published: ${author?author.published_date : 'unknown'}</p>
            <p class="border-bottom mx-5">Rating: <span class="ms-4">${rating? rating.badge : 'Nice'}</span> <span class="ms-5"> <i class="fa-solid fa-star"></i> <i class="fa-regular fa-star-half-stroke"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i></span></p>
            
            <p>${details}</p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    </div>
    `;
};
// loading spinner function
const loaderSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else{
        loader.classList.add('d-none');
    }
};
