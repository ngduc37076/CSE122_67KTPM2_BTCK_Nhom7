const TW = {};
TW.users = [
  { email: "traveler@tripweave.io", password: "123456", name: "Trần Minh Anh", role: "traveler" },
  { email: "guide@tripweave.io", password: "123456", name: "Nguyễn Quốc Huy", role: "guide" },
  { email: "partner@tripweave.io", password: "123456", name: "Lê Thu Hà", role: "partner" },
  { email: "admin@tripweave.io", password: "123456", name: "Phạm Đức Toàn", role: "admin" },
];

TW.ROLE_LABEL = {
  traveler: "Du khách",
  guide: "Hướng dẫn viên",
  partner: "Đối tác địa phương",
  admin: "Quản trị viên",
};

const HOME_BY_ROLE = {
  traveler: "#/admin-content-moderation.html",
  guide: "#/guide-dashboard.html",
  partner: "#/admin-content-moderation.html",
  admin: "#/admin-content-moderation.html",
};

const readStore = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));

TW.session = () => readStore("tripweave_session", null);

TW.signIn = (user) => writeStore("tripweave_session", { email: user.email, name: user.name, role: user.role, at: Date.now() });

TW.signOut = () => localStorage.removeItem("tripweave_session");

TW.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

TW.toast = function (message, tone) {
  let host = document.querySelector(".toast-host");
  if (!host) {
    host = document.createElement("div");
    host.className = "toast-host";
    document.body.appendChild(host);
  }
  const el = document.createElement("div");
  el.className = "toast" + (tone ? " " + tone : "");
  el.setAttribute("role", "status");
  el.textContent = message;
  host.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 220);
  }, 2600);
};

function navAccount() {
  const s = TW.session();
  if (!s) {
    return `<a class="btn btn-light btn-sm" href="#/login.html">Đăng nhập</a>
      <a class="btn btn-primary btn-sm" href="#/register.html">Đăng ký</a>`;
  }
  return `
    <a class="nav-user" href="${HOME_BY_ROLE[s.role] || "#/guide-dashboard.html"}" title="Về bảng điều khiển của bạn">
      <span class="nav-avatar" aria-hidden="true">${TW.esc((s.name || "?").trim().charAt(0).toUpperCase())}</span>
      <span class="nav-who"><b>${TW.esc(s.name)}</b><em>${TW.esc(TW.ROLE_LABEL[s.role] || s.role)}</em></span>
    </a>
    <button class="btn btn-outline btn-sm" data-signout>Đăng xuất</button>`;
}

function buildNavbar(activeKey) {
  const here = location.pathname.split("/").pop() || "#/guide-dashboard.html";
  const links = TW.nav
    .map((n) => `<a href="${n.href}"${n.href === here ? ' class="active" aria-current="page"' : ""}>${TW.esc(n.label)}</a>`)
    .join("");
  return `
  <nav class="navbar">
    <div class="container nav-inner">
      <a class="logo" href="#/guide-dashboard.html"><span class="logo-mark">✦</span><span>TripWeave <em>AI</em></span></a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="navLinks" aria-label="Mở menu">☰</button>
      <div class="nav-links" id="navLinks">${links}</div>
      <div class="nav-actions">${navAccount()}</div>
    </div>
  </nav>`;
}

TW.nav = [
  { href: "#/guide-dashboard.html", label: "Hướng dẫn viên", key: "guide" },
  { href: "guide-curated-collections.html", label: "Bộ sưu tập", key: "guide" },
  { href: "#/guide-trip-review.html", label: "Đánh giá", key: "guide" },
];

TW.side = [
  { href: "#/guide-dashboard.html", label: "Bảng điều khiển", key: "home" },
  { href: "guide-curated-collections.html", label: "Bộ sưu tập", key: "collections" },
  { href: "#/guide-trip-review.html", label: "Đánh giá", key: "review" },
  { href: "#/admin-content-moderation.html", label: "Kiểm duyệt", key: "moderation" },
];

TW.dash = {  "guide-curated-collections": {
    side: "collections", roleLabel: "Hướng dẫn viên",
    title: "Bộ sưu tập đã tuyển chọn",
    sub: "Theo dõi dữ liệu và xử lý nghiệp vụ.",
    stats: [["6", "Bộ đang mở"], ["2", "Chờ duyệt"], ["148", "Địa điểm"], ["2,4K", "Lượt lưu"]],
    rows: [
      ["Ẩm thực đường phố", "24 địa điểm", ["Đã đăng", "success"], "Hôm nay"],
      ["Hà Nội mùa thu", "18 địa điểm", ["Bản nháp", "neutral"], "2 ngày trước"],
      ["Cung trekking Tây Bắc", "31 địa điểm", ["Chờ duyệt", "warning"], "3 ngày trước"],
    ],
    derived: true,
  },};

const DASH_ROLE = { guide: "guide", partner: "partner", admin: "admin" };

Object.keys(TW.dash).forEach((k) => {
  TW.dash[k].role = DASH_ROLE[k.split("-")[0]];
  TW.dash[k].canCreate = k === "partner-activity-management" || k === "admin-content-moderation";
});

let dashState = "default";

function stateLoading() {
  return `
  <div class="state-layer">
    <div class="loading-card"><div class="spinner"></div><span>Loading</span></div>
  </div>`;
}

function stateError() {
  return `
  <div class="state-layer">
    <div class="error-box" role="alert">
      <div>
        <h3>Không có kết nối internet !</h3>
        <p>Hãy:</p>
        <ul>
          <li>Kiểm tra cáp mạng, modem và bộ định tuyến (router)</li>
          <li>Kết nối lại với Wi-Fi</li>
          <li>Chạy Trình chẩn đoán mạng của Windows (Windows Network Diagnostics)</li>
        </ul>
      </div>
      <span class="error-face" aria-hidden="true">☹</span>
    </div>
  </div>`;
}

function renderDashBody(cfg) {
  if (dashState === "loading") return stateLoading();
  if (dashState === "error") return stateError();

  const empty = dashState === "empty";
  const data = cfg;
  const stats = data.stats
    .map(([v, l]) => `<div class="stat"><h3>${empty ? "0" : TW.esc(v)}</h3><p>${TW.esc(l)}</p></div>`)
    .join("");

  const cols = ["Mục", "Chi tiết", "Trạng thái", "Thời gian"];
  const head = cols.map((h) => `<th>${TW.esc(h)}</th>`).join("");

  const noRows = empty;
  const emptyText = "Chưa có dữ liệu nào.";
  const body = noRows
    ? `<tr><td colspan="${cols.length}"><div class="empty"><span class="empty-icon">🗂️</span><p>${emptyText}</p></div></td></tr>`
    : data.rows
        .map((r) => {
          const [label, tone] = r[2];
          
          return `<tr>
            <td data-label="Mục">${TW.esc(r[0])}</td>
            <td data-label="Chi tiết">${TW.esc(r[1])}</td>
            <td data-label="Trạng thái"><span class="status ${tone}">${TW.esc(label)}</span></td>
            <td data-label="Thời gian">${TW.esc(r[3])}</td>
                      </tr>`;
        })
        .join("");

  const panelTitle = "Hoạt động gần đây";
  

  return `
  <div class="stat-grid">${stats}</div>
  ${empty ? `<p><span class="empty-note">Hãy thêm thông tin của bạn</span></p>` : ""}
  <div class="panel">
    <div class="panel-head">
      <h2>${panelTitle}</h2>
      <div class="row" style="gap:8px">
                        <button class="btn btn-light btn-sm" data-refresh>Làm mới</button>
      </div>
    </div>
    <div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>
    ${
      cfg.live === "moderation"
        ? `<p class="tiny muted" style="margin-top:12px">Mẹo: vào <b>Khám phá</b> với tài khoản Du khách hoặc Đối tác, bấm “+ Thêm địa điểm”, rồi quay lại đây để duyệt.</p>`
        : ""
    }
  </div>`;
}

function mountDash(key) {
  const cfg = TW.dash[key];
  const main = document.getElementById("main");
  main.innerHTML = `
    <div class="dash-body">
      ${buildSidebar(cfg)}
      <div class="dash-main">
        <div class="page-head">
          <div>
            <span class="role-chip">${TW.esc(cfg.roleLabel)}</span>
            <h1>${TW.esc(cfg.title)}</h1>
            <p class="sub">${TW.esc(cfg.sub)}</p>
          </div>
          <div class="head-actions">
            <button class="btn btn-primary" data-create>+ Tạo mới</button>
          </div>
        </div>
        <div id="dashBody">${renderDashBody(cfg)}</div>
      </div>
    </div>`;

  const redraw = () => {
    document.getElementById("dashBody").innerHTML = renderDashBody(cfg);
  };

  document.getElementById("dashBody").addEventListener("click", (e) => {
    if (e.target.closest("[data-refresh]")) return refreshDash(cfg, redraw);
              });

  main.querySelector("[data-create]")?.addEventListener("click", () => TW.toast("Bản bài tập dùng dữ liệu mẫu, nên nút này chưa mở form nào."));
}

function refreshDash(cfg, redraw) {
  const host = document.getElementById("dashBody");
  dashState = "loading";
  host.innerHTML = renderDashBody(cfg);
  setTimeout(() => {
    dashState = "default";
    redraw();
    TW.toast("Đã làm mới dữ liệu.", "success");
  }, 900);
}

function mountDenied(cfg) {
  const s = TW.session();
  const need = TW.ROLE_LABEL[cfg.role];
  const main = document.getElementById("main");
  main.innerHTML = `
    <div class="dash-body">
      ${buildSidebar(cfg)}
      <div class="dash-main">
        <div class="deny">
          <span class="deny-icon" aria-hidden="true">${s ? "🔒" : "👤"}</span>
          <h1>${s ? "Trang này dành cho " + TW.esc(need) : "Bạn chưa đăng nhập"}</h1>
          <p class="muted">${
            s
              ? `Bạn đang đăng nhập là <b>${TW.esc(s.name)}</b> (${TW.esc(TW.ROLE_LABEL[s.role] || s.role)}). Trang <b>${TW.esc(cfg.title)}</b> cần tài khoản vai trò <b>${TW.esc(need)}</b>.`
              : `Trang <b>${TW.esc(cfg.title)}</b> cần tài khoản vai trò <b>${TW.esc(need)}</b>.`
          }</p>
          <div class="deny-accounts">
            ${TW.users
              .filter((u) => u.role === cfg.role)
              .map(
                (u) => `<div class="deny-row">
                  <div><b>${TW.esc(u.name)}</b><p class="tiny muted">${TW.esc(u.email)} · mật khẩu ${TW.esc(u.password)}</p></div>
                  <button class="btn btn-primary btn-sm" type="button" data-demo-signin="${TW.esc(u.email)}">Dùng tài khoản này</button>
                </div>`,
              )
              .join("")}
          </div>
          <div class="row" style="justify-content:center;margin-top:18px">
            <a class="btn btn-outline" href="#/login.html">Đăng nhập bằng tài khoản khác</a>
            <a class="btn btn-outline" href="#/guide-dashboard.html">Về trang chủ</a>
          </div>
        </div>
      </div>
    </div>`;

  main.querySelector("[data-demo-signin]")?.addEventListener("click", (e) => {
    const u = TW.users.find((x) => x.email === e.currentTarget.dataset.demoSignin);
    TW.signIn(u);
    TW.toast(`Đã đăng nhập là ${u.name}.`, "success");
    setTimeout(() => location.reload(), 500);
  });
}

function mountStateBar(key) {
  const bar = document.createElement("div");
  bar.className = "state-bar";
  bar.innerHTML = ["default", "loading", "error", "empty"]
    .map((s) => `<button class="btn btn-ghost btn-sm${s === dashState ? " is-on" : ""}" data-state="${s}">${s}</button>`)
    .join("");
  bar.style.cssText =
    "position:fixed;left:16px;bottom:16px;z-index:115;display:flex;gap:6px;" +
    "padding:8px;border-radius:14px;background:rgba(52,69,111,.92);box-shadow:0 10px 28px rgba(15,23,42,.3)";
  bar.querySelectorAll("button").forEach((b) => {
    if (b.dataset.state !== dashState) b.style.opacity = ".6";
    b.addEventListener("click", () => {
      dashState = b.dataset.state;
      document.getElementById("dashBody").innerHTML = renderDashBody(TW.dash[key]);
      bar.querySelectorAll("button").forEach((x) => {
        const on = x.dataset.state === dashState;
        x.classList.toggle("is-on", on);
        x.style.opacity = on ? "1" : ".6";
      });
    });
  });
  document.body.appendChild(bar);
}

function buildSidebar(cfg) {
  const links = TW.side
    .map((s) => `<a class="side-link${s.key === cfg.side ? " active" : ""}" href="${s.href}"${s.key === cfg.side ? ' aria-current="page"' : ""}>${TW.esc(s.label)}</a>`)
    .join("");
  return `
  <aside class="sidebar">
    <span class="side-brand">✦ TripWeave AI</span>
    <span class="side-role">${TW.esc(cfg.roleLabel)}</span>
    ${links}
  </aside>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const page = body.dataset.page || "index";
  const isDash = body.dataset.shell === "dash";

  const skip = body.querySelector(".sr-only");
  skip.insertAdjacentHTML("afterend", buildNavbar(page));

  if (isDash && TW.dash[page]) {
    const cfg = TW.dash[page];
    const s = TW.session();
    body.classList.add("dash");
    if (!s || s.role !== cfg.role) {
      mountDenied(cfg);
    } else {
      mountDash(page);
      mountStateBar(page);
    }
  }

  document.querySelector(".nav-toggle")?.addEventListener("click", (e) => {
    const links = document.getElementById("navLinks");
    const open = links.classList.toggle("is-open");
    e.currentTarget.setAttribute("aria-expanded", String(open));
  });

  document.querySelector("[data-signout]")?.addEventListener("click", () => {
    TW.signOut();
    TW.toast("Đã đăng xuất.", "success");
    setTimeout(() => (location.href = "#/guide-dashboard.html"), 500);
  });
});
const DEMO_ROLE = "guide";
const ELSEWHERE = {"traveler-discover.html":"Khám phá theo sở thích","traveler-trip-planner.html":"Xây dựng lịch trình cá nhân","traveler-ai-itinerary.html":"Lịch trình thông minh","guide-dashboard.html":"Bảng điều khiển hướng dẫn viên","guide-curated-collections.html":"Bộ sưu tập đã tuyển chọn","guide-trip-review.html":"Đánh giá chuyến đi","partner-activity-management.html":"Quản lý hoạt động","partner-interest-dashboard.html":"Dashboard sự quan tâm","partner-profile.html":"Hồ sơ đối tác","login.html":"trang Đăng nhập","register.html":"trang Đăng ký","admin-content-moderation.html":"trang Kiểm duyệt"};
function initIsolatedLinks() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (!a) return;
    e.preventDefault();
    const file = a.getAttribute("href").slice(2);
    if (file === "login.html") {
      const u = TW.users.find((x) => x.role === DEMO_ROLE);
      if (!u) return;
      TW.signIn(u);
      TW.toast("Đã đăng nhập nhanh bằng tài khoản " + TW.ROLE_LABEL[u.role] + ".", "success");
      setTimeout(() => location.reload(), 500);
      return;
    }
    TW.toast((ELSEWHERE[file] || file) + " thuộc một giao diện khác, không có trong bản tách này.");
  });
}
document.addEventListener("DOMContentLoaded", initIsolatedLinks);
