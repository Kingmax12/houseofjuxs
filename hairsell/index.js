        // Initialize Lucide icons
        lucide.createIcons();

        // Cart state
        let cart = [];
        let cartOpen = false;

        // Scroll reveal animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
            } else {
                navbar.classList.remove('shadow-md');
            }
        });

        // Mobile menu toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // Cart functions
        function toggleCart() {
            const sidebar = document.getElementById('cart-sidebar');
            const panel = document.getElementById('cart-panel');
            cartOpen = !cartOpen;
            
            if (cartOpen) {
                sidebar.classList.remove('hidden');
                setTimeout(() => {
                    panel.classList.remove('translate-x-full');
                }, 10);
            } else {
                panel.classList.add('translate-x-full');
                setTimeout(() => {
                    sidebar.classList.add('hidden');
                }, 300);
            }
        }

        function addToCart(name, price) {
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            
            updateCart();
            showToast(`${name} added to cart!`);
            
            // Animate cart icon
            const badge = document.getElementById('cart-count');
            badge.classList.add('scale-125');
            setTimeout(() => badge.classList.remove('scale-125'), 200);
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
        }

        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            const cartCount = document.getElementById('cart-count');
            const cartTotal = document.getElementById('cart-total');
            
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Update badge
            if (totalItems > 0) {
                cartCount.textContent = totalItems;
                cartCount.classList.remove('hidden');
            } else {
                cartCount.classList.add('hidden');
            }
            
            // Update total
            cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
            
            // Update items list
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="text-center text-gray-500 mt-12">
                        <i data-lucide="shopping-bag" class="h-16 w-16 mx-auto mb-4 text-gray-300"></i>
                        <p>Your cart is empty</p>
                        <button onclick="toggleCart(); scrollToSection('collections')" class="mt-4 text-gold-600 font-semibold hover:underline">Start Shopping</button>
                    </div>
                `;
            } else {
                cartItems.innerHTML = cart.map((item, index) => `
                    <div class="flex gap-4 bg-gray-50 p-4 rounded-xl">
                        <div class="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <i data-lucide="package" class="h-8 w-8 text-gray-400"></i>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-bold text-gray-900">${item.name}</h4>
                            <p class="text-gray-600 text-sm">$${item.price} x ${item.quantity}</p>
                            <p class="text-gold-600 font-semibold mt-1">$${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <button onclick="removeFromCart(${index})" class="p-2 hover:bg-gray-200 rounded-full h-fit transition-colors">
                            <i data-lucide="trash-2" class="h-4 w-4 text-red-500"></i>
                        </button>
                    </div>
                `).join('');
            }
            
            lucide.createIcons();
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            
            toastMessage.textContent = message;
            toast.classList.remove('opacity-0', 'translate-y-8');
            
            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-8');
            }, 3000);
        }

        function scrollToSection(id) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }

        function handleSubscribe(e) {
            e.preventDefault();
            showToast('Welcome to the Luxe Club! Check your email for 15% off.');
            e.target.reset();
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    