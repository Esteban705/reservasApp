
export const handleSearch = async (searchQuery: string, setSearchResults: any) => {
    if (searchQuery.trim() !== '') {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
         
            const data = await response.json();
            console.log({data})
            setSearchResults(data);
        } catch (error) {
            console.error('Error searching location:', error);
        }
    }
};