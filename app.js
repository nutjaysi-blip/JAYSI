document.addEventListener("DOMContentLoaded", () => {

    // คลังข้อมูลจำลองหลักของเว็บไซต์ที่สามารถแก้ไขได้ผ่านระบบหลังบ้าน
    let appConfig = {
        marquee: "🔥 ยินดีต้อนรับสู่ JAYSI HUB ระบบมีความเสถียรสูง อัปเดตใหม่ล่าสุดประจำสัปดาห์นี้มาแล้ว! รีบตรวจสอบข้อมูลก่อนใครได้เลย ขอบคุณผู้ใช้บริการทุกท่านครับ 🔥",
        posters: [
            { img: "https://picsum.photos/450/200?random=1", title: "JAYSI PREMIUM SERVER" },
            { img: "https://picsum.photos/450/200?random=2", title: "NEW CONFIGURATION INTERFACE" }
        ],
        socials: {
            discord: "https://discord.gg",
            facebook: "https://facebook.com",
            tiktok: "https://tiktok.com",
            youtube: "https://youtube.com"
        },
        servers: [
            { id: 101, title: "JAYSI Roleplay Town", short: "เมืองจำลองชีวิตเสถียร 60 FPS", full: "ยินดีต้อนรับสู่เซิร์ฟเวอร์หลัก ระบบเศรษฐกิจสมดุล กิจกรรมแจกของรางวัลจัดขึ้นทุกสัปดาห์ มาร่วมสนุกและสร้างสตอรี่ใหม่กับเราได้แล้ววันนี้!", img: "https://picsum.photos/450/200?random=20", link: "https://discord.gg", copyText: "CONNECT JAYSI.ROLEPLAY.COM" },
            { id: 102, title: "Deathmatch PvP Arena", short: "เน้นยิง ปะทะฝีมือ No Delay", full: "ห้องซ้อมมวย ซ้อมยิง ระบบลื่นไหล No Delay ลิงก์ตรงเสถียรที่สุด ของรางวัลอันดับหนึ่งประจำเดือนรับเงินรางวัลและไอเทมพิเศษฟรีทันที", img: "https://picsum.photos/450/200?random=21", link: "https://youtube.com", copyText: "DISCORD.GG/JAYSIPVP" }
        ],
        news: [{ id: 1, title: "เปิดตัวเว็บโฉมใหม่ เสถียร x2", desc: "ปรับแต่งสไตล์ UI ขาวฟ้า เพิ่มฟังก์ชันการเปิดดูรายละเอียดเซิร์ฟเวอร์ย่อยและระบบคัดลอกข้อมูล", img: "https://picsum.photos/450/200?random=30" }],
        spoilers: [{ id: 2, title: "หลุดภาพแผนที่กิจกรรมในอนาคต", desc: "ภาพพรีวิวความคืบหน้าของฟีเจอร์ใหม่ที่กำลังพัฒนา", img: "https://picsum.photos/450/200?random=31" }],
        promotions: [{ id: 3, title: "โปรโมชันเติมเงินคุ้มคูณสอง", desc: "เฉพาะการทำรายการในเดือนนี้เท่านั้น รับโบนัสเหรียญพรีเมียมเพิ่มขึ้น 100%", img: "https://picsum.photos/450/200?random=32" }]
    };

    // --- ส่วนที่ 1: ระบบ Loading หน้าเว็บเสถียรแบบใหม่ ---
    const splash = document.getElementById("splash-screen");
    setTimeout(() => {
        splash.style.opacity = "0";
        setTimeout(() => splash.style.display = "none", 450);
    }, 1300);

    // --- ส่วนที่ 2: ระบบเลื่อนแบนเนอร์โปสเตอร์อัตโนมัติ ---
    let currentSlide = 0;
    function startPosterSlider() {
        const slides = document.querySelectorAll(".slide-item");
        if(slides.length === 0) return;
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 4000);
    }

    // --- ส่วนที่ 3: แถบเมนูนำทาง 3 ขีดและสลับหน้าตาแอป ---
    const navButtons = document.querySelectorAll(".nav-btn");
    const pageViews = document.querySelectorAll(".page-view");
    const menuToggleBtn = document.getElementById("menu-toggle-btn");
    const sideDrawer = document.getElementById("side-drawer");
    const drawerOverlay = document.getElementById("drawer-overlay");
    const drawerClose = document.getElementById("drawer-close");

    function navigateTo(targetViewId) {
        pageViews.forEach(v => v.classList.remove("active"));
        navButtons.forEach(b => b.classList.remove("active"));

        const view = document.getElementById(targetViewId);
        if (view) view.classList.add("active");

        const btn = document.querySelector(`.nav-btn[data-target="${targetViewId}"]`);
        if (btn) btn.classList.add("active");
    }

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => navigateTo(btn.getAttribute("data-target")));
    });

    menuToggleBtn.addEventListener("click", () => { sideDrawer.classList.add("open"); drawerOverlay.style.display = "block"; });
    function closeDrawer() { sideDrawer.classList.remove("open"); drawerOverlay.style.display = "none"; }
    drawerClose.addEventListener("click", closeDrawer);
    drawerOverlay.addEventListener("click", closeDrawer);

    document.querySelectorAll(".drawer-menu li").forEach(li => {
        li.addEventListener("click", () => { navigateTo(li.getAttribute("data-target")); closeDrawer(); });
    });

    // --- ส่วนที่ 4: ระบบค้นหาครอบคลุมทุกหมวดหมู่ (Global Search) + คำสั่งรับแอดมินหลังบ้าน ---
    const searchInput = document.getElementById("app-search");
    const loginModal = document.getElementById("login-modal");
    const adminPasswordInput = document.getElementById("admin-password");

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const keyword = searchInput.value.trim().toLowerCase();
            
            if (keyword === "/jaysi") {
                searchInput.value = "";
                loginModal.style.display = "flex";
                adminPasswordInput.focus();
                return;
            }

            if (keyword === "") {
                renderAppUI();
                return;
            }

            // เริ่มทำการค้นหาแบบไขว้ข้ามทุกหมวดหมู่ที่มีในระบบ
            let foundInPage = null;

            // ตรวจสอบข้อมูลในฝั่ง Servers (หน้า Home)
            const matchServer = appConfig.servers.some(s => s.title.toLowerCase().includes(keyword) || s.short.toLowerCase().includes(keyword) || s.full.toLowerCase().includes(keyword));
            // ตรวจสอบใน News
            const matchNews = appConfig.news.some(n => n.title.toLowerCase().includes(keyword) || n.desc.toLowerCase().includes(keyword));
            // ตรวจสอบใน Spoilers
            const matchSpoiler = appConfig.spoilers.some(s => s.title.toLowerCase().includes(keyword) || s.desc.toLowerCase().includes(keyword));
            // ตรวจสอบใน Promotions
            const matchPromo = appConfig.promotions.some(p => p.title.toLowerCase().includes(keyword) || p.desc.toLowerCase().includes(keyword));

            // ค้นหาเจอหมวดหมู่ไหน นำทางผู้ใช้งานไปยังหน้านั้นโดยทันที
            if (matchServer) foundInPage = "home-view";
            else if (matchNews) foundInPage = "news-view";
            else if (matchSpoiler) foundInPage = "spoiler-view";
            else if (matchPromo) foundInPage = "promotion-view";

            if (foundInPage) {
                navigateTo(foundInPage);
                // เรนเดอร์การ์ดฟิลเตอร์เฉพาะไอเทมที่ค้นเจอคำสำคัญ
                executeFilterRender(keyword);
            } else {
                alert("❌ ไม่พบข้อมูลที่สอดคล้องกับคำค้นหาของคุณในทุกหมวดหมู่");
            }
        }
    });

    // ฟังก์ชันย่อยสำหรับกรองแสดงเฉพาะเนื้อหาที่ตรงกับ Keyword ค้นหา
    function executeFilterRender(keyword) {
        // กรองการ์ด Server หน้าหลัก
        const filteredServers = appConfig.servers.filter(s => s.title.toLowerCase().includes(keyword) || s.short.toLowerCase().includes(keyword));
        document.getElementById("server-list-container").innerHTML = filteredServers.map(srv => `
            <div class="server-card" onclick="openServerDetailsModal(${srv.id})">
                <div class="server-card-img" style="background-image: url('${srv.img}')"></div>
                <div class="server-card-info">
                    <div><h4>${srv.title}</h4><p>${srv.short}</p></div>
                    <button class="btn-view-more">ดูข้อมูล</button>
                </div>
            </div>
        `).join('');

        // กรองหน้า News พร้อมติดคลาสไฮไลต์สีฟ้ารอบกรอบ
        const filteredNews = appConfig.news.filter(n => n.title.toLowerCase().includes(keyword) || n.desc.toLowerCase().includes(keyword));
        document.getElementById("news-container").innerHTML = filteredNews.map(x => `
            <div class="content-item-card highlight-search">
                ${x.img ? `<div class="content-card-img" style="background-image:url('${x.img}')"></div>` : ''}
                <h4>${x.title}</h4><p>${x.desc}</p>
            </div>`).join('');

        // กรองหน้า Spoiler
        const filteredSpoilers = appConfig.spoilers.filter(s => s.title.toLowerCase().includes(keyword) || s.desc.toLowerCase().includes(keyword));
        document.getElementById("spoiler-container").innerHTML = filteredSpoilers.map(x => `
            <div class="content-item-card highlight-search">
                ${x.img ? `<div class="content-card-img" style="background-image:url('${x.img}')"></div>` : ''}
                <h4>${x.title}</h4><p>${x.desc}</p>
            </div>`).join('');

        // กรองหน้า Promotion
        const filteredPromos = appConfig.promotions.filter(p => p.title.toLowerCase().includes(keyword) || p.desc.toLowerCase().includes(keyword));
        document.getElementById("promo-container").innerHTML = filteredPromos.map(x => `
            <div class="content-item-card highlight-search">
                ${x.img ? `<div class="content-card-img" style="background-image:url('${x.img}')"></div>` : ''}
                <h4>${x.title}</h4><p>${x.desc}</p>
            </div>`).join('');
    }

    // ล็อกอินเข้าระบบหลังบ้าน แอดมิน
    document.getElementById("login-submit").addEventListener("click", () => {
        if (adminPasswordInput.value === "1234") {
            loginModal.style.display = "none";
            adminPasswordInput.value = "";
            loadAdminDataGrid();
            navigateTo("admin-view");
        } else {
            alert("รหัสผ่านไม่ถูกต้อง! (ลองรหัสผ่าน: 1234)");
            adminPasswordInput.value = "";
        }
    });

    document.getElementById("login-cancel").addEventListener("click", () => { loginModal.style.display = "none"; adminPasswordInput.value = ""; });
    document.getElementById("logout-btn").addEventListener("click", () => { navigateTo("home-view"); renderAppUI(); });

    // --- ส่วนที่ 5: การเรนเดอร์ข้อมูลโครงสร้าง Dynamic ทั่วทั้งเว็บไซต์ ---
    function renderAppUI() {
        // 1. เรนเดอร์โปสเตอร์สไลด์หน้าแรก
        document.getElementById("poster-track").innerHTML = appConfig.posters.map((p, idx) => `
            <div class="slide-item ${idx === 0 ? 'active' : ''}" style="background: linear-gradient(rgba(0,0,0,0.2), #0A0D14), url('${p.img}')">
                <h2>${p.title}</h2>
            </div>
        `).join('');

        // 2. เรนเดอร์ข้อความวิ่ง
        document.getElementById("marquee-wrapper").innerHTML = `<div class="marquee-text">${appConfig.marquee}</div>`;

        // 3. เรนเดอร์ 4 โซเชียลหลัก
        document.getElementById("social-grid-container").innerHTML = `
            <a href="${appConfig.socials.discord}" target="_blank" class="social-icon-btn"><i class="fab fa-discord"></i></a>
            <a href="${appConfig.socials.facebook}" target="_blank" class="social-icon-btn"><i class="fab fa-facebook"></i></a>
            <a href="${appConfig.socials.tiktok}" target="_blank" class="social-icon-btn"><i class="fab fa-tiktok"></i></a>
            <a href="${appConfig.socials.youtube}" target="_blank" class="social-icon-btn"><i class="fab fa-youtube"></i></a>
        `;

        // 4. เรนเดอร์รายการการ์ด Server หน้าแรก
        document.getElementById("server-list-container").innerHTML = appConfig.servers.map(srv => `
            <div class="server-card" onclick="openServerDetailsModal(${srv.id})">
                <div class="server-card-img" style="background-image: url('${srv.img}')"></div>
                <div class="server-card-info">
                    <div><h4>${srv.title}</h4><p>${srv.short}</p></div>
                    <button class="btn-view-more">ดูข้อมูล</button>
                </div>
            </div>
        `).join('');

        // 5. เรนเดอร์หน้า News, Spoiler, Promotion (แสดงรูปภาพได้ทั้งหมด)
        document.getElementById("news-container").innerHTML = appConfig.news.map(x => `
            <div class="content-item-card">
                ${x.img ? `<div class="content-card-img" style="background-image:url('${x.img}')"></div>` : ''}
                <h4>${x.title}</h4><p>${x.desc}</p>
            </div>`).join('');

        document.getElementById("spoiler-container").innerHTML = appConfig.spoilers.map(x => `
            <div class="content-item-card">
                ${x.img ? `<div class="content-card-img" style="background-image:url('${x.img}')"></div>` : ''}
                <h4>${x.title}</h4><p>${x.desc}</p>
            </div>`).join('');

        document.getElementById("promo-container").innerHTML = appConfig.promotions.map(x => `
            <div class="content-item-card">
                ${x.img ? `<div class="content-card-img" style="background-image:url('${x.img}')"></div>` : ''}
                <h4>${x.title}</h4><p>${x.desc}</p>
            </div>`).join('');
    }

    // ฟังก์ชันเปิดดูรายละเอียด Pop-up การ์ดเซิร์ฟเวอร์ย่อย + ปุ่มคัดลอกข้อความ
    window.openServerDetailsModal = function(id) {
        const srv = appConfig.servers.find(s => s.id === id);
        if (srv) {
            document.getElementById("modal-server-img").style.backgroundImage = `url('${srv.img}')`;
            document.getElementById("modal-server-title").innerText = srv.title;
            document.getElementById("modal-server-desc").innerText = srv.full;
            
            const copySection = document.getElementById("copy-section");
            const copyInput = document.getElementById("modal-copy-input");
            
            if(srv.copyText) {
                copySection.style.display = "flex";
                copyInput.value = srv.copyText;
            } else {
                copySection.style.display = "none";
            }

            document.getElementById("modal-server-action").href = srv.link || "#";
            document.getElementById("details-modal").style.display = "flex";
        }
    };

    document.getElementById("modal-copy-btn").addEventListener("click", () => {
        const copyInput = document.getElementById("modal-copy-input");
        copyInput.select();
        navigator.clipboard.writeText(copyInput.value);
        alert("คัดลอกข้อความไปยังคลิปบอร์ดสำเร็จ!");
    });

    document.getElementById("modal-close").addEventListener("click", () => { document.getElementById("details-modal").style.display = "none"; });

    // --- ส่วนที่ 6: ฟังก์ชันการจัดการระบบหลังบ้าน CRUD ดึงค่ามาแก้ไข/เพิ่ม/ลบ ---
    function loadAdminDataGrid() {
        document.getElementById("link-discord").value = appConfig.socials.discord;
        document.getElementById("link-facebook").value = appConfig.socials.facebook;
        document.getElementById("link-tiktok").value = appConfig.socials.tiktok;
        document.getElementById("link-youtube").value = appConfig.socials.youtube;
        document.getElementById("adm-marquee-input").value = appConfig.marquee;
        document.getElementById("adm-poster1").value = appConfig.posters[0]?.img || '';
        document.getElementById("adm-title1").value = appConfig.posters[0]?.title || '';
        document.getElementById("adm-poster2").value = appConfig.posters[1]?.img || '';
        document.getElementById("adm-title2").value = appConfig.posters[1]?.title || '';

        const liveList = document.getElementById("live-data-list");
        liveList.innerHTML = "";

        appConfig.servers.forEach(s => {
            liveList.innerHTML += `<div class="managed-item" onclick="deleteItemData('servers', ${s.id})"><span><span class="type-badge">SERVER</span>${s.title}</span><i class="fas fa-trash"></i></div>`;
        });
        appConfig.news.forEach(n => {
            liveList.innerHTML += `<div class="managed-item" onclick="deleteItemData('news', ${n.id})"><span><span class="type-badge">NEWS</span>${n.title}</span><i class="fas fa-trash"></i></div>`;
        });
        appConfig.spoilers.forEach(s => {
            liveList.innerHTML += `<div class="managed-item" onclick="deleteItemData('spoilers', ${s.id})"><span><span class="type-badge">SPOILER</span>${s.title}</span><i class="fas fa-trash"></i></div>`;
        });
        appConfig.promotions.forEach(p => {
            liveList.innerHTML += `<div class="managed-item" onclick="deleteItemData('promotions', ${p.id})"><span><span class="type-badge">PROMO</span>${p.title}</span><i class="fas fa-trash"></i></div>`;
        });
    }

    document.getElementById("save-socials-btn").addEventListener("click", () => {
        appConfig.socials.discord = document.getElementById("link-discord").value;
        appConfig.socials.facebook = document.getElementById("link-facebook").value;
        appConfig.socials.tiktok = document.getElementById("link-tiktok").value;
        appConfig.socials.youtube = document.getElementById("link-youtube").value;
        alert("อัปเดตลิงก์โซเชียลมีเดียทั้ง 4 แพลตฟอร์มแล้ว!");
        renderAppUI();
    });

    document.getElementById("save-home-assets-btn").addEventListener("click", () => {
        appConfig.marquee = document.getElementById("adm-marquee-input").value;
        appConfig.posters = [
            { img: document.getElementById("adm-poster1").value, title: document.getElementById("adm-title1").value },
            { img: document.getElementById("adm-poster2").value, title: document.getElementById("adm-title2").value }
        ];
        alert("บันทึกการแก้ไขโปสเตอร์และข้อความวิ่งสำเร็จ!");
        renderAppUI();
    });

    document.getElementById("save-server-btn").addEventListener("click", () => {
        const title = document.getElementById("srv-title").value.trim();
        const img = document.getElementById("srv-img").value.trim() || "https://picsum.photos/450/200";
        const short = document.getElementById("srv-short").value.trim();
        const full = document.getElementById("srv-full").value.trim();
        const copyText = document.getElementById("srv-copy").value.trim();
        const link = document.getElementById("srv-link").value.trim();

        if(!title || !short || !full) { alert("โปรดกรอกรายละเอียดให้ครบถ้วน!"); return; }

        appConfig.servers.push({ id: Date.now(), title, img, short, full, copyText, link });
        alert("เพิ่มข้อมูลเซิร์ฟเวอร์ใหม่เรียบร้อย!");
        
        document.getElementById("srv-title").value = ""; document.getElementById("srv-short").value = "";
        document.getElementById("srv-full").value = ""; document.getElementById("srv-copy").value = ""; document.getElementById("srv-link").value = "";

        renderAppUI();
        loadAdminDataGrid();
    });

    document.getElementById("save-content-btn").addEventListener("click", () => {
        const target = document.getElementById("content-page-target").value;
        const title = document.getElementById("content-title").value.trim();
        const img = document.getElementById("content-img").value.trim();
        const desc = document.getElementById("content-desc").value.trim();

        if(!title || !desc) { alert("กรุณากรอกหัวข้อและเนื้อหาด้วยครับ!"); return; }

        appConfig[target].unshift({ id: Date.now(), title, desc, img });
        alert("ส่งข้อมูลคอนเทนต์เข้าหน้านั้นๆ สำเร็จ!");

        document.getElementById("content-title").value = "";
        document.getElementById("content-img").value = "";
        document.getElementById("content-desc").value = "";

        renderAppUI();
        loadAdminDataGrid();
    });

    window.deleteItemData = function(catalog, id) {
        if(confirm("ต้องการลบข้อมูลรายการนี้ออกใช่หรือไม่?")) {
            appConfig[catalog] = appConfig[catalog].filter(x => x.id !== id);
            renderAppUI();
            loadAdminDataGrid();
        }
    };

    // เปิดใช้งานเริ่มต้น
    renderAppUI();
    startPosterSlider();
});
