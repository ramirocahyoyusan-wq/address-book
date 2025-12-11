let contacts = JSON.parse(localStorage.getItem("contacts")) || [
  { id: 1, name: "Ramiro CY", email: "ramiro@mail.com", phone: "08123456789" }
];

let trash = JSON.parse(localStorage.getItem("trash")) || [];
let editId = null;

const saveData = () => {
  localStorage.setItem("contacts", JSON.stringify(contacts));
  localStorage.setItem("trash", JSON.stringify(trash));
};

const renderTable = () => {
  const container = document.getElementById("contactTable");
  if (contacts.length === 0) {
    container.innerHTML = "<p class='text-gray-500 italic text-center py-4'>Tidak ada kontak.</p>";
    return;
  }
  container.innerHTML = `
    <table class='w-full text-sm'>
      <thead class='bg-gray-100 border-b'>
        <tr>
          <th class='text-left py-3 px-4'>Nama</th>
          <th class='text-left py-3 px-4'>Email</th>
          <th class='text-left py-3 px-4'>Telepon</th>
          <th class='text-left py-3 px-4'>Aksi</th>
        </tr>
      </thead>
      <tbody>
        ${contacts.map(c => `
          <tr class='border-b hover:bg-gray-50'>
            <td class='py-3 px-4'>${c.name}</td>
            <td class='py-3 px-4'>${c.email}</td>
            <td class='py-3 px-4'>${c.phone}</td>
            <td class='py-3 px-4 space-x-2'>
              <button onclick='editContact(${c.id})' class='px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg text-xs'>Edit</button>
              <button onclick='deleteContact(${c.id})' class='px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs'>Hapus</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
};

const openModal = (edit = false) => {
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modalTitle").innerText = edit ? "Edit Kontak" : "Tambah Kontak";
};

const closeModal = () => {
  document.getElementById("modal").classList.add("hidden");
};

document.getElementById("addBtn").onclick = () => {
  editId = null;
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  openModal(false);
};

document.getElementById("closeModal").onclick = closeModal;

const editContact = (id) => {
  const c = contacts.find(x => x.id === id);
  editId = id;
  nameInput.value = c.name;
  emailInput.value = c.email;
  phoneInput.value = c.phone;
  openModal(true);
};

const deleteContact = (id) => {
  const index = contacts.findIndex(x => x.id === id);
  trash.push(contacts[index]);
  contacts.splice(index, 1);
  saveData();
  renderTable();
};

document.getElementById("saveBtn").onclick = () => {
  if (!nameInput.value) return alert("Nama wajib diisi!");

  if (editId) {
    const c = contacts.find(x => x.id === editId);
    c.name = nameInput.value;
    c.email = emailInput.value;
    c.phone = phoneInput.value;
  } else {
    contacts.push({
      id: Date.now(),
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value
    });
  }

  saveData();
  closeModal();
  renderTable();
};

document.getElementById("trashBtn").onclick = () => {
  alert("Data yang dihapus ada di trash.");
};

renderTable();