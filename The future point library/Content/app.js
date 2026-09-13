const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuButton) menuButton.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.reveal').forEach((element, index) => { element.style.animationDelay = `${index * 80}ms`; });
const events = [
	{ date: '18', month: 'OCT', title: 'Scholarship Exam Workshop', type: 'Workshop', detail: 'A practical session on applications, essays and exam planning.' },
	{ date: '26', month: 'OCT', title: 'Meet the Author: Anuradha Roy', type: 'Talk', detail: 'An evening conversation about place, memory and modern Indian fiction.' },
	{ date: '02', month: 'NOV', title: "Children's Story Lab", type: 'Young readers', detail: 'Picture books, read-alouds and a hands-on story-making hour.' }
];
const eventList = document.querySelector('#event-list');
if (eventList) eventList.innerHTML = events.map(event => `<article class="event-card reveal"><div class="date"><strong>${event.date}</strong><small>${event.month}</small></div><div><span class="tag">${event.type}</span><h3>${event.title}</h3><p>${event.detail}</p></div></article>`).join('');
const searchInput = document.querySelector('#book-search');
const categoryFilter = document.querySelector('.catalog-tools select');
const filterBooks = () => {
	const query = searchInput ? searchInput.value.toLowerCase() : '';
	const category = categoryFilter ? categoryFilter.value.toLowerCase() : 'all categories';
	document.querySelectorAll('.book').forEach(book => {
		const text = book.textContent.toLowerCase();
		book.hidden = !text.includes(query) || (category !== 'all categories' && !text.includes(category));
	});
};
if (searchInput) searchInput.addEventListener('input', filterBooks);
if (categoryFilter) categoryFilter.addEventListener('change', filterBooks);
const contactForm = document.querySelector('#contact-form');
if (contactForm) contactForm.addEventListener('submit', event => {
	event.preventDefault();
	const formData = new FormData(contactForm);
	const subject = encodeURIComponent(`Library enquiry from ${formData.get('name')}`);
	const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`);
	window.location.href = `mailto:hello@thefuturepointlibrary.in?subject=${subject}&body=${body}`;
	contactForm.querySelector('.form-message').textContent = 'Your email app is opening with the message ready to send.';
});