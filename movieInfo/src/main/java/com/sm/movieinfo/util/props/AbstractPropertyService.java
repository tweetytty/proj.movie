package com.sm.movieinfo.util.props;

import java.util.Enumeration;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
import java.util.Set;
import java.util.StringTokenizer;

public abstract class AbstractPropertyService {
    protected ResourceBundle resourceBundle;
    protected ResourceBundle defaultResourceBundle;

    protected String propertyFileName;
    protected String defaultPropertyFileName;

    protected static final String defaultDelimiter = ",";

    /**
     * Loads the resourceBundle with the context class loader
     * 
     * @param name
     */
    protected AbstractPropertyService(String propertyFileName) {
        this(propertyFileName, Thread.currentThread().getContextClassLoader());
    }

    /**
     * Loads the resourceBundle with the given class loader
     * 
     * @param name
     * @param classLoader
     */
    protected AbstractPropertyService(String propertyFileName,
            ClassLoader classLoader) {
        this(propertyFileName, null, classLoader);
    }

    /**
     * Loads the resourceBundle as well as the default resourceBundle with the
     * context class loader
     * 
     * @param propertyFileName
     * @param defaultPropertyFileName
     */
    protected AbstractPropertyService(String propertyFileName,
            String defaultPropertyFileName) {
        this(propertyFileName, defaultPropertyFileName, Thread.currentThread()
                .getContextClassLoader());
    }

    /**
     * Loads the resourceBundle as well as the default resourceBundle with the
     * given class loader
     * 
     * @param propertyFileName
     * @param defaultPropertyFileName
     * @param classLoader
     */
    protected AbstractPropertyService(String propertyFileName,
            String defaultPropertyFileName, ClassLoader classLoader) {
        if (propertyFileName == null || propertyFileName.equals(""))
            throw new IllegalArgumentException(
                    "Property fileName cannot be null / empty");
        this.propertyFileName = propertyFileName;
        boolean isPropertyFileMissing = false;
        try {
            this.resourceBundle = ResourceBundle.getBundle(propertyFileName,
                    Locale.getDefault(), classLoader);
        } catch (MissingResourceException e) {
            isPropertyFileMissing = true;
        }

        if (defaultPropertyFileName == null
                || defaultPropertyFileName.equals("")) {
            this.defaultPropertyFileName = defaultPropertyFileName;
            try {
                this.defaultResourceBundle = ResourceBundle.getBundle(
                        defaultPropertyFileName, Locale.getDefault(),
                        classLoader);
                isPropertyFileMissing = false;
            } catch (MissingResourceException e) {
                this.defaultResourceBundle = null;
            }
        }

        if (isPropertyFileMissing)
            throw new MissingResourceException("The property files "
                    + propertyFileName + " or " + defaultPropertyFileName
                    + " are not available to be loaded", propertyFileName,
                    "sys.service.propertyfilenotfound");
    }

    /**
     * @return Returns the propertyFileName.
     */
    public String getPropertyFileName() {
        return propertyFileName;
    }

    /**
     * @return Returns the defaultPropertyFileName.
     */
    public String getDefaultPropertyFileName() {
        return defaultPropertyFileName;
    }

    /**
     * Returns the entire set of properties keys.
     * 
     * @return property keys
     */
    protected final Set<String> getPropertyKeys() {
        Set<String> keys = new HashSet<String>(32);
        keys.addAll(getKeys(resourceBundle));
        if (assertNonNullDefaultResourceBundle())
            keys.addAll(getKeys(defaultResourceBundle));
        return keys;
    }

    /**
     * Returns the entire set of properties keys for the given resource bundle.
     * 
     * @return property keys
     */
    protected final Set<String> getKeys(ResourceBundle bundle) {
        if (bundle == null)
            return null;
        Set<String> keys = new HashSet<String>(32);

        Enumeration<String> resourceKeys = bundle.getKeys();
        while (resourceKeys.hasMoreElements())
            keys.add(resourceKeys.nextElement());
        return keys;
    }

    /**
     * Returns the entire set of properties as a String Array.
     * 
     * @return properties
     */
    protected String[] getPropertyValues() {
        List<String> values = new LinkedList<String>();

        Iterator<String> iter = getPropertyKeys().iterator();
        while (iter.hasNext()) {
            values.add(getValue(iter.next()));
        }
        return values.toArray(new String[0]);
    }

    /**
     * Prints the properties
     */
    public void printProperties() {
        Iterator<String> iter = getPropertyKeys().iterator();
        while (iter.hasNext()) {
            String key = iter.next();
            this.printKeyValue(key, getValue(key));
        }
    }

    protected void printKeyValue(String key, String value) {
        System.out.println(key + "=" + value);
    }

    /**
     * Returns the property value for the given key as a String
     * 
     * @param key
     * @param defaultValue
     * @return value
     */
    protected String getProperty(String key, final String defaultValue) {
        String prop = this.getValue(key);
        return ((prop == null) ? defaultValue : prop);
    }

    /**
     * Returns the property value for the given key as an int
     * 
     * @param key
     * @param defaultValue
     * @return value
     */
    protected int getProperty(String key, final int defaultValue) {
        String prop = this.getValue(key);
        if (prop == null)
            return defaultValue;
        else {
            try {
                return Integer.parseInt(prop);
            } catch (NumberFormatException e) {
                return defaultValue;
            }
        }
    }

    /**
     * Returns the property value for the given key as a float
     * 
     * @param key
     * @param defaultValue
     * @return value
     */
    protected float getProperty(String key, final float defaultValue) {
        String prop = this.getValue(key);
        if (prop == null)
            return defaultValue;
        else {
            try {
                return Float.parseFloat(prop);
            } catch (NumberFormatException e) {
                return defaultValue;
            }
        }
    }

    /**
     * Returns the property value for the given key as a double
     * 
     * @param key
     * @param defaultValue
     * @return value
     */
    protected double getProperty(String key, final double defaultValue) {
        String prop = this.getValue(key);
        if (prop == null)
            return defaultValue;
        else {
            try {
                return Double.parseDouble(prop);
            } catch (NumberFormatException e) {
                throw e;
            }
        }
    }

    /**
     * Returns the property value for the given key as a boolean
     * 
     * @param key
     * @param defaultValue
     * @return value
     */
    protected boolean getProperty(String key, final boolean defaultValue) {
        String prop = this.getValue(key);
        if (prop == null)
            return defaultValue;
        else
            return Boolean.valueOf(prop).booleanValue();
    }

    /**
     * Returns the list of properties for a given key, as an array. Uses the
     * default delimiter(',') to parse the property value.
     * 
     * @param key
     * @param defaultValue
     * @return property array
     */
    protected String[] getProperties(String key, final String[] defaultValue) {
        return getProperties(key, defaultValue, defaultDelimiter);
    }

    /**
     * Returns the list of properties for a given key, as an array. Uses the
     * delimiter passed to parse the property value.
     * 
     * @param key
     * @param defaultValue
     * @param token
     * @return property array
     */
    protected String[] getProperties(String key, final String[] defaultValue,
            String token) {
        String prop = this.getValue(key);
        if (token == null)
            token = defaultDelimiter;
        if (prop == null)
            return defaultValue;
        else {
            StringTokenizer tokeniser = new StringTokenizer(prop, token);
            String[] properties = new String[tokeniser.countTokens()];
            int count = 0;
            while (tokeniser.hasMoreTokens()) {
                properties[count++] = tokeniser.nextToken();
            }
            return properties;
        }
    }

    /**
     * Checks whether the key passed is null or not.
     * 
     * @param key
     * @throws IllegalArgumentException
     */
    private void assertNullKey(String key) throws IllegalArgumentException {
        if (key == null)
            throw new IllegalArgumentException("Key cannot be null");
    }

    /**
     * Checks whether the default resource bundle is null
     * 
     * @return
     */
    private boolean assertNonNullDefaultResourceBundle() {
        return defaultResourceBundle != null;
    }

    /**
     * Fetches the property for the key Checks whether the key passed is null or
     * not.
     * 
     * @param key
     * @return value
     */
    private String getValue(String key) {
        assertNullKey(key);
        if (resourceBundle != null) {
            try {
                return resourceBundle.getString(key);
            } catch (MissingResourceException e) {
                if (assertNonNullDefaultResourceBundle()) {
                    try {
                        return defaultResourceBundle.getString(key);
                    } catch (MissingResourceException e1) {
                    }
                }
            }
        } else {
            try {
                return defaultResourceBundle.getString(key);
            } catch (MissingResourceException e1) {
            }
        }
        return null;

    }

}