import React, { createContext, useState } from 'react';

// Create context
export const FilenameContext = createContext();

// Create a provider component to wrap the app
export const FilenameProvider = ({ children }) => {
    const [filename, setFilename] = useState('');

    return (
        <FilenameContext.Provider value={{ filename, setFilename }}>
            {children}
        </FilenameContext.Provider>
    );
};

export default FilenameContext;
