import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
      setAccessGranted(true);
    } else {
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
    <motion.div
      className="p-6 bg-[#0F1117] rounded-2xl shadow-xl backdrop-blur-md max-w-md mx-auto text-[#E5E7EB]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-[#38BDF8]">Secure Vault Login</h2>
      {!accessGranted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter internal passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="border border-gray-600 rounded-2xl px-4 py-3 w-full bg-[#1E2128] text-[#F9FAFB] placeholder-[#A78BFA] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          />
          <button
            type="submit"
            className="bg-[#38BDF8] text-[#0F1117] px-6 py-3 rounded-2xl font-semibold hover:bg-[#22A7F0] transition"
          >
            Access
          </button>
        </form>
      ) : (
        <>
          <p className="text-[#22C55E] font-semibold mb-6">Access Granted. Vault unlocked.</p>
          <button
            onClick={addVaultKey}
            className="bg-[#38BDF8] text-[#0F1117] px-6 py-3 rounded-2xl font-semibold hover:bg-[#22A7F0] mb-6 transition"
          >
            Add Vault Key
          </button>
          <ul>
            {vaultKeys.map(({ key, id }) => (
              <li
                key={id}
                className="flex justify-between items-center border border-gray-700 p-3 rounded-2xl mb-3 bg-[#1E2128]"
              >
                <span className="font-mono tracking-widest">
                  {aesEnabled && aesKey.trim() !== ''
                    ? atob(key).slice(0, 4) + '•••••-key-' + atob(key).slice(-4)
                    : key.slice(0, 4) + '•••••-key-' + key.slice(-4)}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => editVaultKey(id)}
                    className="bg-[#A78BFA] text-[#0F1117] px-3 py-1 rounded-2xl font-semibold hover:bg-[#8B6FD1] transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteVaultKey(id)}
                    className="bg-[#F87171] text-[#0F1117] px-3 py-1 rounded-2xl font-semibold hover:bg-[#D65A5A] transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-6">
        <label className="inline-flex items-center mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={aesEnabled}
            onChange={() => setAesEnabled(!aesEnabled)}
            className="form-checkbox h-5 w-5 text-[#38BDF8] bg-[#1E2128] border-gray-600 rounded"
          />
          <span className="ml-3 text-[#E5E7EB] font-semibold">Enable AES Encryption</span>
        </label>
        {aesEnabled && (
          <input
            type="password"
            placeholder="Enter AES key"
            value={aesKey}
            onChange={(e) => setAesKey(e.target.value)}
            className="border border-gray-600 rounded-2xl px-4 py-3 w-full bg-[#1E2128] text-[#F9FAFB] placeholder-[#A78BFA] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          />
        )}
        <h3 className="text-xl font-semibold mt-6 mb-4 text-[#A78BFA]">Audit Log</h3>
        <div className="max-h-40 overflow-y-auto bg-[#1E2128] p-4 rounded-2xl text-sm font-mono text-[#E5E7EB]">
          {auditLog.length === 0 ? (
            <p className="text-gray-500">No audit entries yet.</p>
          ) : (
            auditLog.map((entry, idx) => (
              <div key={idx} className="mb-2">
                [{new Date(entry.timestamp).toLocaleString()}] {entry.action.toUpperCase()} -{' '}
                {aesEnabled && aesKey.trim() !== ''
                  ? atob(entry.key).slice(0, 4) + '•••••-key-' + atob(entry.key).slice(-4)
                  : entry.key.slice(0, 4) + '•••••-key-' + entry.key.slice(-4)}
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SecureVaultPanel;
