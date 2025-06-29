import React, { useState, useEffect } from 'react';

const SecureVaultPanel = () => {
  const [passcode, setPasscode] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [vaultKeys, setVaultKeys] = useState(() => {
    const saved = localStorage.getItem('kaizenos_vault_keys');
    return saved ? JSON.parse(saved) : [];
  });
  const SECRET_CODE = "YOUR_SECRET_INTERNAL_CODE";

  useEffect(() => {
    localStorage.setItem('kaizenos_vault_keys', JSON.stringify(vaultKeys));
  }, [vaultKeys]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode === SECRET_CODE) {
      alert("Access Granted");
      setAccessGranted(true);
    } else {
      alert("Access Denied");
      setAccessGranted(false);
    }
  };

  const [aesEnabled, setAesEnabled] = React.useState(false);
  const [aesKey, setAesKey] = React.useState('');
  const [auditLog, setAuditLog] = React.useState(() => {
    const saved = localStorage.getItem('kaizenos_vault_audit_log');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('kaizenos_vault_audit_log', JSON.stringify(auditLog));
  }, [auditLog]);

  const addVaultKey = () => {
    let newKey = prompt('Enter new vault key:');
    if (newKey && newKey.trim() !== '') {
      if (aesEnabled && aesKey.trim() !== '') {
        // Simple AES encryption placeholder (to be replaced with real encryption)
        newKey = btoa(newKey.trim());
      } else {
        newKey = newKey.trim();
      }
      setVaultKeys([...vaultKeys, { key: newKey, id: Date.now() }]);
      setAuditLog([...auditLog, { action: 'add', key: newKey, timestamp: Date.now() }]);
    }
  };

  const editVaultKey = (id) => {
    const keyObj = vaultKeys.find(k => k.id === id);
    if (!keyObj) return;
    let editedKey = prompt('Edit vault key:', aesEnabled && aesKey.trim() !== '' ? atob(keyObj.key) : keyObj.key);
    if (editedKey && editedKey.trim() !== '') {
      if (aesEnabled && aesKey.trim() !== '') {
        editedKey = btoa(editedKey.trim());
      } else {
        editedKey = editedKey.trim();
      }
      setVaultKeys(vaultKeys.map(k => (k.id === id ? { ...k, key: editedKey } : k)));
      setAuditLog([...auditLog, { action: 'edit', key: editedKey, timestamp: Date.now() }]);
    }
  };

  const deleteVaultKey = (id) => {
    const keyObj = vaultKeys.find(k => k.id === id);
    setVaultKeys(vaultKeys.filter(k => k.id !== id));
    if (keyObj) {
      setAuditLog([...auditLog, { action: 'delete', key: keyObj.key, timestamp: Date.now() }]);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Secure Vault Login</h2>
      {!accessGranted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter internal passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Access
          </button>
        </form>
      ) : (
        <>
          <p className="text-green-600 font-semibold mb-4">Access Granted. Vault unlocked.</p>
          <button
            onClick={addVaultKey}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
          >
            Add Vault Key
          </button>
          <ul>
            {vaultKeys.map(({ key, id }) => (
              <li key={id} className="flex justify-between items-center border p-2 rounded mb-2">
                <span>{key.slice(0, 4)}****{key.slice(-4)}</span>
                <button
                  onClick={() => deleteVaultKey(id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    <div>
      <label className="inline-flex items-center mb-4">
        <input
          type="checkbox"
          checked={aesEnabled}
          onChange={() => setAesEnabled(!aesEnabled)}
          className="form-checkbox"
        />
        <span className="ml-2">Enable AES Encryption</span>
      </label>
      {aesEnabled && (
        <input
          type="password"
          placeholder="Enter AES key"
          value={aesKey}
          onChange={(e) => setAesKey(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
        />
      )}
      <h3 className="text-lg font-semibold mb-2">Vault Keys</h3>
      <ul>
        {vaultKeys.map(({ key, id }) => (
          <li key={id} className="flex justify-between items-center border p-2 rounded mb-2">
            <span>{aesEnabled && aesKey.trim() !== '' ? atob(key).slice(0, 4) + '****' + atob(key).slice(-4) : key.slice(0, 4) + '****' + key.slice(-4)}</span>
            <div>
              <button
                onClick={() => editVaultKey(id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteVaultKey(id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={addVaultKey}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        Add Vault Key
      </button>
      <h3 className="text-lg font-semibold mt-6 mb-2">Audit Log</h3>
      <div className="max-h-32 overflow-y-auto bg-gray-100 p-2 rounded text-sm">
        {auditLog.length === 0 ? (
          <p className="text-gray-500">No audit entries yet.</p>
        ) : (
          auditLog.map((entry, idx) => (
            <div key={idx}>
              [{new Date(entry.timestamp).toLocaleString()}] {entry.action.toUpperCase()} - {aesEnabled && aesKey.trim() !== '' ? atob(entry.key).slice(0, 4) + '****' + atob(entry.key).slice(-4) : entry.key.slice(0, 4) + '****' + entry.key.slice(-4)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SecureVaultPanel;
